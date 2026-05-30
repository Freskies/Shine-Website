'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/services/supabase';
import { getActiveEvent, completeEvent, type Event } from '@/app/services/1000Back/apiEvents';
import { getParticipants, type Participant } from '@/app/services/1000Back/apiParticipants';

export function useGlobalMetrics () {
	const queryClient = useQueryClient();
	const [now, setNow] = useState<number>(0);
	const [activeTab, setActiveTab] = useState<'backflips' | 'pushups' | 'pullups'>('backflips');
	const [sortBy, setSortBy] = useState<keyof Participant>('backflips');

	useEffect(() => {
		const interval = setInterval(() => {
			setNow(Date.now());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const { data: activeEvent } = useQuery<Event | null>({
		queryKey: ['active_event'],
		queryFn: getActiveEvent,
	});

	const { data: participants = [] } = useQuery<Participant[]>({
		queryKey: ['participants', activeEvent?.id],
		queryFn: () => activeEvent?.id ? getParticipants(activeEvent.id) : Promise.resolve([]),
		enabled: !!activeEvent?.id,
	});

	useEffect(() => {
		if (!activeEvent?.id) return;

		const participantChannel = supabase
			.channel(`participants-event-${activeEvent.id}`)
			.on('postgres_changes', {
				event: '*',
				table: 'participants',
				schema: 'public',
				filter: `event_id=eq.${activeEvent.id}`
			}, (payload) => {
				queryClient.setQueryData(['participants', activeEvent.id], (old: Participant[] | undefined) => {
					if (!old) return [];
					if (payload.eventType === 'INSERT') return [...old, payload.new as Participant];
					if (payload.eventType === 'UPDATE') return old.map(p => p.id === payload.new.id ? (payload.new as Participant) : p);
					if (payload.eventType === 'DELETE') return old.filter(p => p.id !== payload.old.id);
					return old;
				});
			})
			.subscribe();

		const eventChannel = supabase
			.channel(`event-changes-${activeEvent.id}`)
			.on('postgres_changes', {
				event: 'UPDATE',
				table: 'events',
				schema: 'public',
				filter: `id=eq.${activeEvent.id}`
			}, (payload) => {
				queryClient.setQueryData(['active_event'], payload.new);
			})
			.subscribe();

		return () => {
			supabase.removeChannel(participantChannel);
			supabase.removeChannel(eventChannel);
		};
	}, [queryClient, activeEvent?.id]);

	const totals = useMemo(() => ({
		backflips: participants.reduce((sum, p) => sum + p.backflips, 0),
		pushups: participants.reduce((sum, p) => sum + p.pushups, 0),
		pullups: participants.reduce((sum, p) => sum + p.pullups, 0),
	}), [participants]);

	const targets = { backflips: 1000, pushups: 2026, pullups: 2026 };

	// Auto-completion effect
	useEffect(() => {
		if (!activeEvent || activeEvent.completed_at || !activeEvent.start_time) return;

		const isCompleted = 
			totals.backflips >= targets.backflips &&
			totals.pushups >= targets.pushups &&
			totals.pullups >= targets.pullups;

		if (isCompleted) {
			completeEvent(activeEvent.id).catch(console.error);
		}
	}, [totals, activeEvent, targets.backflips, targets.pushups, targets.pullups]);

	const completion = Math.min((totals[activeTab] / targets[activeTab]) * 100, 100);

	const elapsedMs = useMemo(() => {
		if (!activeEvent?.start_time || !now) return 0;
		const start = new Date(activeEvent.start_time).getTime();
		const end = activeEvent.completed_at 
			? new Date(activeEvent.completed_at).getTime() 
			: now;
		return Math.max(0, end - start);
	}, [activeEvent, now]);

	const bpmTotal = useMemo(() => {
		const minutes = elapsedMs / 60000;
		return minutes > 0 ? (totals[activeTab] / minutes).toFixed(1) : '0.0';
	}, [activeTab, totals, elapsedMs]);

	const sortedParticipants = useMemo(() => {
		return [...participants].sort((a, b) => {
			const valA = a[sortBy];
			const valB = b[sortBy];
			return (typeof valA === 'number' && typeof valB === 'number') ? valB - valA : 0;
		});
	}, [participants, sortBy]);

	const handleTabChange = (tab: 'backflips' | 'pushups' | 'pullups') => {
		setActiveTab(tab);
		setSortBy(tab);
	};

	return {
		activeEvent,
		participants,
		totals,
		activeTab,
		setActiveTab: handleTabChange,
		sortBy,
		setSortBy,
		completion,
		elapsedMs,
		bpmTotal,
		sortedParticipants
	};
}
