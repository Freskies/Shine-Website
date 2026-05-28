'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/lib/supabase';
import styles from './participant.module.css';
import { Maintenance } from '@/app/components/Maintenance/Maintenance';

interface Participant {
	name: string;
	backflips: number;
}

export default function ParticipantPage() {
	const isMaintenance = true;
	const [selectedName, setSelectedName] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const { data: participants = [] } = useQuery<Participant[]>({
		queryKey: ['participants'],
		queryFn: async () => {
			const { data, error } = await supabase.from('participants').select('*').order('name');
			if (error) throw error;
			return data;
		},
		enabled: !isMaintenance,
	});

	const updateBackflips = useMutation({
		mutationFn: async ({ name, amount }: { name: string, amount: number }) => {
			const { data, error } = await supabase.rpc('update_backflips', { p_name: name, amount });
			if (error) throw error;
			return data;
		},
		onMutate: async ({ name, amount }) => {
			await queryClient.cancelQueries({ queryKey: ['participants'] });
			const previous = queryClient.getQueryData(['participants']);
			queryClient.setQueryData(['participants'], (old: Participant[] | undefined) => {
				return old?.map((p: Participant) => p.name === name ? { ...p, backflips: p.backflips + amount } : p);
			});
			return { previous };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData(['participants'], context?.previous);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['participants'] });
		},
	});

	if (isMaintenance) {
		return <Maintenance 
			title="Interfaccia Chiusa" 
			description="L'inserimento dei backflip non è ancora attivo. Sarà disponibile durante l'evento ufficiale."
		/>;
	}

	if (!selectedName) {
		return (
			<div className={styles.container}>
				<div className={styles.card}>
					<h1 className={styles.title}>Chi sei?</h1>
					<div className={styles.nameList}>
						{participants.map(p => (
							<button
								key={p.name}
								onClick={() => setSelectedName(p.name)}
								className={styles.nameButton}
							>
								{p.name}
							</button>
						))}
					</div>
				</div>
			</div>
		);
	}

	const me = participants.find(p => p.name === selectedName);

	return (
		<div className={styles.container}>
			<div className={styles.cardLarge}>
				<button 
					onClick={() => setSelectedName(null)}
					className={styles.backButton}
				>
					← Non sei tu? Cambia nome
				</button>
				<h1 className={styles.participantName}>{selectedName}</h1>
				
				<div className={styles.counterContainer}>
					<div className={styles.counterValue}>{me?.backflips || 0}</div>
					<div className={styles.counterLabel}>Backflips</div>
				</div>

				<div className={styles.buttonGrid}>
					<button
						onClick={() => updateBackflips.mutate({ name: selectedName, amount: 1 })}
						className={styles.buttonPlus1}
					>
						+1
					</button>
					<button
						onClick={() => updateBackflips.mutate({ name: selectedName, amount: 5 })}
						className={styles.buttonPlusSmall}
					>
						+5
					</button>
					<button
						onClick={() => updateBackflips.mutate({ name: selectedName, amount: 10 })}
						className={styles.buttonPlusSmall}
					>
						+10
					</button>
					<button
						onClick={() => updateBackflips.mutate({ name: selectedName, amount: -1 })}
						className={styles.buttonMinus}
					>
						Oops, togli -1
					</button>
				</div>
			</div>
		</div>
	);
}
