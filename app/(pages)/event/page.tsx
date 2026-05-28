'use client';

import { useEffect, useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import styles from './event1000.module.css';

interface Participant {
	name: string;
	backflips: number;
}

interface EventStatus {
	id: number;
	start_time: string | null;
	is_active: boolean;
}

export default function Dashboard () {
	const isMaintenance = true;

	const queryClient = useQueryClient();
	const [now, setNow] = useState<number>(0);

	// Update clock every second
	useEffect(() => {
		const updateTime = () => setNow(Date.now());
		updateTime();
		if (isMaintenance) return;
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [isMaintenance]);

	// Fetch Initial Data
	const { data: participants = [] } = useQuery<Participant[]>({
		queryKey: ['participants'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('participants')
				.select('*')
				.order('backflips', { ascending: false });
			if (error) throw error;
			return data;
		},
		enabled: !isMaintenance,
	});

	const { data: eventStatus } = useQuery<EventStatus>({
		queryKey: ['event_status'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('event_status')
				.select('*')
				.eq('id', 1)
				.single();
			if (error) throw error;
			return data;
		},
		enabled: !isMaintenance,
	});

	// Realtime Subscriptions
	useEffect(() => {
		if (isMaintenance) return;
		const participantChannel = supabase
			.channel('participants-db-changes')
			.on('postgres_changes', { event: '*', table: 'participants', schema: 'public' }, (payload) => {
				queryClient.setQueryData(['participants'], (old: Participant[] | undefined) => {
					if (!old) return [];
					if (payload.eventType === 'INSERT') {
						return [...old, payload.new as Participant].sort((a, b) => b.backflips - a.backflips);
					}
					if (payload.eventType === 'UPDATE') {
						return old.map(p => p.name === payload.new.name ? (payload.new as Participant) : p)
							.sort((a, b) => b.backflips - a.backflips);
					}
					if (payload.eventType === 'DELETE') {
						return old.filter(p => p.name !== payload.old.name);
					}
					return old;
				});
			})
			.subscribe();

		const eventStatusChannel = supabase
			.channel('event-status-db-changes')
			.on('postgres_changes', {
				event: 'UPDATE',
				table: 'event_status',
				schema: 'public',
				filter: 'id=eq.1'
			}, (payload) => {
				queryClient.setQueryData(['event_status'], payload.new);
			})
			.subscribe();

		return () => {
			supabase.removeChannel(participantChannel);
			supabase.removeChannel(eventStatusChannel);
		};
	}, [queryClient, isMaintenance]);

	// Calculations
	const totalBackflips = useMemo(() => participants.reduce((sum, p) => sum + p.backflips, 0), [participants]);
	const completion = Math.min((totalBackflips / 1000) * 100, 100);

	const elapsedMs = useMemo(() => {
		if (!eventStatus?.start_time || !eventStatus.is_active) return 0;
		const start = new Date(eventStatus.start_time).getTime();
		return Math.max(0, now - start);
	}, [eventStatus, now]);

	const formatTime = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const h = Math.floor(totalSeconds / 3600);
		const m = Math.floor((totalSeconds % 3600) / 60);
		const s = totalSeconds % 60;
		return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
	};

	const bpmTotal = useMemo(() => {
		const minutes = elapsedMs / 60000;
		return minutes > 0 ? (totalBackflips / minutes).toFixed(1) : '0.0';
	}, [totalBackflips, elapsedMs]);

	if (isMaintenance) {
		return <Maintenance 
			title="Evento in Arrivo" 
			description="Stiamo preparando tutto per la sfida dei 1000 Backflip. Torna presto per vedere il progresso in tempo reale!"
		/>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<header className={styles.header}>
					<h1 className={styles.title}>1000 BACKFLIP EVENT</h1>
					<p className={styles.subtitle}>Challenge Collettiva SHINE</p>
				</header>

				{/* Main Stats */}
				<div className={styles.statsGrid}>
					<StatCard label="Tempo Trascorso" value={formatTime(elapsedMs)}/>
					<StatCard label="Backflips Totali" value={totalBackflips.toString()}/>
					<StatCard label="BPM Collettivo" value={bpmTotal}/>
					<StatCard label="Completamento" value={`${completion.toFixed(1)}%`}/>
				</div>

				{/* Progress Bar */}
				<div className={styles.progressContainer}>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${completion}%` }}
						className={styles.progressBar}
					>
						{completion > 5 && `${completion.toFixed(0)}%`}
					</motion.div>
				</div>

				{/* Leaderboard */}
				<div className={styles.leaderboard}>
					<table className={styles.table}>
						<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>Persona</th>
							<th className={styles.thCenter}>Backflips</th>
							<th className={styles.thCenter}>BPM</th>
							<th className={styles.thCenter}>% Contributo</th>
						</tr>
						</thead>
						<tbody className="bg-white divide-y divide-zinc-200">
						<AnimatePresence>
							{participants.map((p) => {
								const indBpm = elapsedMs > 0 ? (p.backflips / (elapsedMs / 60000)).toFixed(1) : '0.0';
								const contribution = totalBackflips > 0 ? ((p.backflips / totalBackflips) * 100).toFixed(1) : '0.0';
								return (
									<motion.tr
										key={p.name}
										layout
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className={styles.tr}
									>
										<td className={styles.tdName}>{p.name}</td>
										<td className={styles.tdCenter}>{p.backflips}</td>
										<td className={styles.tdCenter}>{indBpm}</td>
										<td className={styles.tdCenter}>{contribution}%</td>
									</motion.tr>
								);
							})}
						</AnimatePresence>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

function StatCard ({ label, value }: { label: string, value: string }) {
	return (
		<div className={styles.statCard}>
			<span className={styles.statLabel}>{label}</span>
			<span className={styles.statValue}>{value}</span>
		</div>
	);
}
