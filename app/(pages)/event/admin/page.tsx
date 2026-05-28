'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/lib/supabase';
import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
	const isMaintenance = true;
	const [newName, setNewName] = useState('');
	const queryClient = useQueryClient();

	const { data: eventStatus } = useQuery({
		queryKey: ['event_status'],
		queryFn: async () => {
			const { data, error } = await supabase.from('event_status').select('*').eq('id', 1).single();
			if (error) throw error;
			return data;
		},
		enabled: !isMaintenance,
	});

	const { data: participants = [] } = useQuery({
		queryKey: ['participants'],
		queryFn: async () => {
			const { data, error } = await supabase.from('participants').select('*').order('name');
			if (error) throw error;
			return data;
		},
		enabled: !isMaintenance,
	});

	const startEvent = useMutation({
		mutationFn: async () => {
			const { data, error } = await supabase
				.from('event_status')
				.update({ is_active: true, start_time: new Date().toISOString() })
				.eq('id', 1);
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['event_status'] });
		},
	});

	const resetEvent = useMutation({
		mutationFn: async () => {
			const { error: err1 } = await supabase
				.from('event_status')
				.update({ is_active: false, start_time: null })
				.eq('id', 1);
			if (err1) throw err1;
			
			const { error: err2 } = await supabase
				.from('participants')
				.update({ backflips: 0 })
				.gt('backflips', -1); // update all
			if (err2) throw err2;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['event_status'] });
			queryClient.invalidateQueries({ queryKey: ['participants'] });
		},
	});

	const addParticipant = useMutation({
		mutationFn: async (name: string) => {
			const { data, error } = await supabase.from('participants').insert([{ name, backflips: 0 }]);
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			setNewName('');
			queryClient.invalidateQueries({ queryKey: ['participants'] });
		},
	});

	if (isMaintenance) {
		return <Maintenance 
			title="Admin Panel protetto" 
			description="L'accesso al pannello di controllo è temporaneamente disabilitato."
		/>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<h1 className={styles.title}>Admin Panel</h1>

				{/* Event Control */}
				<div className={styles.card}>
					<h2 className={styles.cardTitle}>Stato Evento</h2>
					<div className={styles.eventStatusRow}>
						<div>
							<p className={styles.statusText}>Stato: <span className={eventStatus?.is_active ? styles.statusActive : styles.statusInactive}>
								{eventStatus?.is_active ? 'ATTIVO' : 'NON ATTIVO'}
							</span></p>
							<p className={styles.timeText}>Inizio: {eventStatus?.start_time ? new Date(eventStatus.start_time).toLocaleString() : '-'}</p>
						</div>
						<div className="space-x-2">
							{!eventStatus?.is_active ? (
								<button 
									onClick={() => startEvent.mutate()}
									className={styles.buttonStart}
								>
									START EVENT
								</button>
							) : (
								<button 
									onClick={() => resetEvent.mutate()}
									className={styles.buttonReset}
								>
									RESET EVERYTHING
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Add Participant */}
				<div className={styles.card}>
					<h2 className={styles.cardTitle}>Aggiungi Partecipante</h2>
					<form onSubmit={(e) => { e.preventDefault(); if(newName) addParticipant.mutate(newName); }} className={styles.form}>
						<input 
							type="text" 
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							placeholder="Nome"
							className={styles.input}
						/>
						<button 
							type="submit"
							className={styles.buttonAdd}
						>
							AGGIUNGI
						</button>
					</form>
				</div>

				{/* Participants List */}
				<div className={styles.card}>
					<h2 className={styles.cardTitle}>Lista Partecipanti ({participants.length})</h2>
					<div className={styles.list}>
						{participants.map(p => (
							<div key={p.name} className={styles.listItem}>
								<span className={styles.participantName}>{p.name}</span>
								<span className={styles.participantBackflips}>{p.backflips} backflips</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
