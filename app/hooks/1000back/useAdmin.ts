'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getActiveEvent,
	getEvents,
	createEvent,
	setActiveEvent,
	updateEventStartTime,
	finishEvent,
	deleteEvent,
	type Event
} from '@/app/services/1000Back/apiEvents';
import {
	getParticipants,
	addParticipant,
	updateParticipantScore,
	type Participant
} from '@/app/services/1000Back/apiParticipants';
import { getSession } from '@/app/services/1000Back/auth/apiAuth';

export function useAdmin () {
	const queryClient = useQueryClient();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [newName, setNewName] = useState('');
	const [newEventName, setNewEventName] = useState('');

	// Check session on mount
	useEffect(() => {
		getSession().then(session => setIsAuthenticated(!!session));
	}, []);

	const { data: activeEvent, isLoading: isLoadingActive } = useQuery<Event | null>({
		queryKey: ['active_event'],
		queryFn: getActiveEvent,
		enabled: isAuthenticated === true,
	});

	const { data: events = [], isLoading: isLoadingEvents } = useQuery<Event[]>({
		queryKey: ['events'],
		queryFn: getEvents,
		enabled: isAuthenticated === true,
	});

	const { data: participants = [], isLoading: isLoadingParticipants } = useQuery<Participant[]>({
		queryKey: ['participants', activeEvent?.id],
		queryFn: () => activeEvent?.id ? getParticipants(activeEvent.id) : Promise.resolve([]),
		enabled: !!activeEvent?.id,
	});

	const createEventMutation = useMutation({
		mutationFn: createEvent,
		onSuccess: () => {
			setNewEventName('');
			queryClient.invalidateQueries({ queryKey: ['events'] });
		},
		onError: (err: Error) => {
			alert('Errore RLS o sessione scaduta: ' + (err.message || 'Riprova.'));
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
		}
	});

	const setActiveEventMutation = useMutation({
		mutationFn: setActiveEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
			queryClient.invalidateQueries({ queryKey: ['events'] });
			queryClient.invalidateQueries({ queryKey: ['participants'] });
		},
		onError: (err: Error) => {
			alert('Errore RLS o sessione scaduta: ' + (err.message || 'Riprova.'));
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
		}
	});

	const startEvent = useMutation({
		mutationFn: async () => {
			if (!activeEvent) return;
			return updateEventStartTime(activeEvent.id, new Date().toISOString());
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
		},
		onError: (err: Error) => {
			alert('Errore RLS o sessione scaduta: ' + (err.message || 'Riprova.'));
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
		}
	});

	const finishEventMutation = useMutation({
		mutationFn: async () => {
			if (!activeEvent) return;
			return finishEvent(activeEvent.id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
			queryClient.invalidateQueries({ queryKey: ['events'] });
		},
		onError: (err: Error) => {
			alert('Impossibile finire l\'evento: ' + (err.message || 'sessione scaduta.'));
		}
	});

	const deleteEventMutation = useMutation({
		mutationFn: async (eventId: number) => {
			return deleteEvent(eventId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
			queryClient.invalidateQueries({ queryKey: ['events'] });
		},
		onError: (err: Error) => {
			alert('Impossibile cancellare l\'evento: ' + (err.message || 'potrebbero esserci partecipanti collegati.'));
		}
	});

	const addParticipantMutation = useMutation({
		mutationFn: async (name: string) => {
			if (!activeEvent) throw new Error('No active event');
			return addParticipant(name, activeEvent.id);
		},
		onSuccess: () => {
			setNewName('');
			queryClient.invalidateQueries({ queryKey: ['participants', activeEvent?.id] });
		},
		onError: (err: Error) => {
			alert('Errore: ' + (err.message || 'sessione scaduta o evento chiuso.'));
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
		}
	});

	const updateScore = useMutation({
		mutationFn: async ({ id, field, amount }: { id: number, field: string, amount: number }) => {
			// Prevent negative scores even from admin if it's a decrement
			const p = participants.find(p => p.id === id);
			if (p && amount < 0) {
				const currentValue = p[field as keyof Participant] as number;
				if (currentValue + amount < 0) {
					// If trying to go below zero, we can either throw or just adjust amount
					// Adjusting amount to exactly zero is safer for UX
					return updateParticipantScore(id, field, -currentValue);
				}
			}
			return updateParticipantScore(id, field, amount);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['participants', activeEvent?.id] });
		},
		onError: (err: Error) => {
			alert('Impossibile modificare: ' + (err.message || 'evento chiuso o sessione scaduta.'));
			queryClient.invalidateQueries({ queryKey: ['active_event'] });
		}
	});

	const logout = async () => {
		const { logout: supabaseLogout } = await import('@/app/services/1000Back/auth/apiAuth');
		await supabaseLogout();
		setIsAuthenticated(false);
	};

	return {
		isAuthenticated,
		setIsAuthenticated,
		activeEvent,
		events,
		participants,
		newName,
		setNewName,
		newEventName,
		setNewEventName,
		createEventMutation,
		setActiveEventMutation,
		startEvent,
		finishEventMutation,
		deleteEventMutation,
		addParticipantMutation,
		updateScore,
		logout,
		isLoading: isAuthenticated === null || isLoadingActive || isLoadingEvents || (!!activeEvent?.id && isLoadingParticipants)
	};
}
