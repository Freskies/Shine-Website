'use client';

import { useGlobalMetrics } from '@/app/hooks/1000back/useGlobalMetrics';
import { motion, AnimatePresence } from 'framer-motion';
import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import styles from './event1000.module.css';

export const dynamic = 'force-dynamic';

export default function Dashboard () {
	const isMaintenance = false;

	const {
		activeEvent,
		totals,
		activeTab,
		setActiveTab,
		sortBy,
		setSortBy,
		completion,
		elapsedMs,
		bpmTotal,
		sortedParticipants
	} = useGlobalMetrics();

	const formatTime = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const h = Math.floor(totalSeconds / 3600);
		const m = Math.floor((totalSeconds % 3600) / 60);
		const s = totalSeconds % 60;
		return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
	};

	if (isMaintenance) {
		return <Maintenance 
			title="Evento in Arrivo" 
			description="Stiamo preparando tutto per la sfida. Torna presto per vedere il progresso in tempo reale!"
		/>;
	}

	if (!activeEvent) {
		return (
			<div className={styles.container}>
				<div className={styles.inner}>
					<header className={styles.header}>
						<h1 className={styles.title}>NESSUN EVENTO ATTIVO</h1>
						<p className={styles.subtitle}>Torna più tardi o contatta l&apos;amministratore.</p>
					</header>
				</div>
			</div>
		);
	}

	const totalBackflips = totals.backflips;
	const totalPushups = totals.pushups;
	const totalPullups = totals.pullups;

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<header className={styles.header}>
					<h1 className={styles.title}>{activeEvent.name.toUpperCase()}</h1>
					<p className={styles.subtitle}>Backflips, Push-ups & Pull-ups</p>
				</header>

				{/* Tabs Selector */}
				<div className={styles.tabSelector}>
					<button 
						className={`${styles.tabButton} ${activeTab === 'backflips' ? styles.tabActive : ''}`}
						onClick={() => setActiveTab('backflips')}
					>
						Backflips (Target 1000)
					</button>
					<button 
						className={`${styles.tabButton} ${activeTab === 'pushups' ? styles.tabActive : ''}`}
						onClick={() => setActiveTab('pushups')}
					>
						Push-ups (Target 2026)
					</button>
					<button 
						className={`${styles.tabButton} ${activeTab === 'pullups' ? styles.tabActive : ''}`}
						onClick={() => setActiveTab('pullups')}
					>
						Pull-ups (Target 2026)
					</button>
				</div>

				{/* Main Stats */}
				<div className={styles.statsGrid}>
					<StatCard label="Tempo Trascorso" value={formatTime(elapsedMs)}/>
					<StatCard 
						label={`Totale ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`} 
						value={totals[activeTab].toString()}
					/>
					<StatCard 
						label={`${activeTab.toUpperCase().slice(0, 1)}PM Collettivo`} 
						value={bpmTotal}
					/>
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
							<th 
								className={`${styles.thCenter} ${sortBy === 'backflips' ? styles.thActive : styles.thClickable}`}
								onClick={() => setSortBy('backflips')}
							>
								Backflip
							</th>
							<th 
								className={`${styles.thCenter} ${sortBy === 'pushups' ? styles.thActive : styles.thClickable}`}
								onClick={() => setSortBy('pushups')}
							>
								Push-up
							</th>
							<th 
								className={`${styles.thCenter} ${sortBy === 'pullups' ? styles.thActive : styles.thClickable}`}
								onClick={() => setSortBy('pullups')}
							>
								Pull-up
							</th>
						</tr>
						</thead>
						<tbody className="bg-white divide-y divide-zinc-200">
						<AnimatePresence>
							{sortedParticipants.map((p) => {
								const bfContrib = totalBackflips > 0 ? ((p.backflips / totalBackflips) * 100).toFixed(1) : '0.0';
								const puContrib = totalPushups > 0 ? ((p.pushups / totalPushups) * 100).toFixed(1) : '0.0';
								const plContrib = totalPullups > 0 ? ((p.pullups / totalPullups) * 100).toFixed(1) : '0.0';
								
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
										<td className={styles.tdCenter}>
											<div className={styles.tdValue}>{p.backflips}</div>
											<div className={styles.tdSubValue}>{bfContrib}%</div>
										</td>
										<td className={styles.tdCenter}>
											<div className={styles.tdValue}>{p.pushups}</div>
											<div className={styles.tdSubValue}>{puContrib}%</div>
										</td>
										<td className={styles.tdCenter}>
											<div className={styles.tdValue}>{p.pullups}</div>
											<div className={styles.tdSubValue}>{plContrib}%</div>
										</td>
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
