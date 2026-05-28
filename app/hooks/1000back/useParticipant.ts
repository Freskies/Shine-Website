'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getActiveEvent, type Event } from '@/app/services/1000Back/apiEvents';
import {
	getParticipants,
	getParticipantByName,
	addParticipant,
	updateParticipantScore,
	type Participant
} from '@/app/services/1000Back/apiParticipants';
import { getSession } from '@/app/services/1000Back/auth/apiAuth';

export function useParticipant () {
	const queryClient = useQueryClient();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null);
	const [isHydrated, setIsHydrated] = useState(false);
	const [nameInput, setNameInput] = useState('');

	// Carica il partecipante dal localStorage all'avvio
	useEffect(() => {
		const savedId = localStorage.getItem('participant_id');
		if (savedId) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSelectedParticipantId(Number(savedId));
		}
		setIsHydrated(true);
	}, []);

	// Salva il partecipante nel localStorage quando cambia
	useEffect(() => {
		if (isHydrated) {
			if (selectedParticipantId) {
				localStorage.setItem('participant_id', selectedParticipantId.toString());
			} else {
				localStorage.removeItem('participant_id');
			}
		}
	}, [selectedParticipantId, isHydrated]);

	// Check session on mount
	useEffect(() => {
		getSession().then(session => setIsAuthenticated(!!session));
	}, []);

	const { data: activeEvent, isLoading: isLoadingEvent } = useQuery<Event | null>({
		queryKey: ['active_event'],
		queryFn: getActiveEvent,
		enabled: isAuthenticated === true,
	});

	const { data: participants = [], isLoading: isLoadingParticipants } = useQuery<Participant[]>({
		queryKey: ['participants', activeEvent?.id],
		queryFn: () => activeEvent?.id ? getParticipants(activeEvent.id) : Promise.resolve([]),
		enabled: !!activeEvent?.id,
	});

	const joinEvent = useMutation({
		mutationFn: async (name: string) => {
			if (!activeEvent) throw new Error('Evento non attivo');
			let p = await getParticipantByName(name, activeEvent.id);
			if (!p) {
				p = await addParticipant(name, activeEvent.id);
			}
			return p;
		},
		onSuccess: (p) => {
			setSelectedParticipantId(p.id);
			queryClient.invalidateQueries({ queryKey: ['participants', activeEvent?.id] });
		},
		onError: (err: Error) => {
			alert('Errore RLS o sessione scaduta: ' + (err.message || 'Riprova.'));
			window.location.reload();
		}
	});

	const updateScore = useMutation({
		mutationFn: async ({ id, field, amount }: { id: number, field: string, amount: number }) => {
			if (isNotStarted) throw new Error('Evento non ancora iniziato');
			if (isEventClosed) throw new Error('Evento chiuso');
			
			// Prevent negative scores
			if (me && amount < 0) {
				const currentValue = me[field as keyof Participant] as number;
				if (currentValue + amount < 0) {
					return updateParticipantScore(id, field, -currentValue);
				}
			}
			
			return updateParticipantScore(id, field, amount);
		},
		onMutate: async ({ id, field, amount }) => {
			if (isNotStarted || isEventClosed) return;

			await queryClient.cancelQueries({ queryKey: ['participants', activeEvent?.id] });
			const previous = queryClient.getQueryData(['participants', activeEvent?.id]);
			queryClient.setQueryData(['participants', activeEvent?.id], (old: Participant[] | undefined) => {
				return old?.map((p: Participant) => p.id === id ? {
					...p,
					[field]: Math.max(0, (p[field as keyof Participant] as number) + amount)
				} : p);
			});
			return { previous };
		},
		onError: (err: Error, variables, context) => {
			queryClient.setQueryData(['participants', activeEvent?.id], context?.previous);
			alert('Impossibile modificare: evento chiuso o sessione scaduta.');
			queryClient.invalidateQueries({ queryKey: ['participants', activeEvent?.id] });
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['participants', activeEvent?.id] });
		},
	});

	const logoutParticipant = () => {
		setSelectedParticipantId(null);
		setNameInput('');
	};

	const me = participants.find(p => p.id === selectedParticipantId);
	const isEventClosed = activeEvent ? !activeEvent.is_active : true;
	const isNotStarted = activeEvent ? !activeEvent.start_time : true;

	const totals = useMemo(() => ({
		backflips: participants.reduce((sum, p) => sum + p.backflips, 0),
		pushups: participants.reduce((sum, p) => sum + p.pushups, 0),
		pullups: participants.reduce((sum, p) => sum + p.pullups, 0),
	}), [participants]);

	const targets = { backflips: 1000, pushups: 2026, pullups: 2026 };

	return {
		isAuthenticated,
		setIsAuthenticated,
		isHydrated,
		activeEvent,
		participants,
		totals,
		targets,
		me,
		isEventClosed,
		isNotStarted,
		nameInput,
		setNameInput,
		setSelectedParticipantId,
		joinEvent,
		updateScore,
		logoutParticipant,
		isLoading: isLoadingEvent || isLoadingParticipants || isAuthenticated === null || !isHydrated
	};
}
