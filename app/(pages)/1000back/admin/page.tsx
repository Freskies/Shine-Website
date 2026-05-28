'use client';

import { useAdmin } from '@/app/hooks/1000back/useAdmin';
import LoginGate from '@/app/components/Auth/LoginGate';
import styles from './admin.module.css';
import { Participant } from '@/app/services/1000Back/apiParticipants';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
	const {
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
		isLoading
	} = useAdmin();

	const [isEventsOpen, setIsEventsOpen] = useState(false);
	const [isControlOpen, setIsControlOpen] = useState(false);

	if (isLoading) return null;
	
	if (isAuthenticated === false) {
		return <LoginGate mode="admin" onSuccess={() => setIsAuthenticated(true)} />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<h1 className={styles.title}>Admin Panel</h1>
					<button onClick={logout} className={styles.miniButton}>LOGOUT</button>
				</div>

				{/* Event Management Accordion */}
				<div className={styles.card}>
					<div 
						className={styles.accordionHeader} 
						onClick={() => setIsEventsOpen(!isEventsOpen)}
					>
						<h2 className={styles.cardTitle} style={{ marginBottom: 0 }}>Gestione Eventi</h2>
						<span className={styles.accordionIcon}>{isEventsOpen ? '−' : '+'}</span>
					</div>
					
					{isEventsOpen && (
						<div className={styles.accordionContent}>
							<form onSubmit={(e) => { e.preventDefault(); if(newEventName) createEventMutation.mutate(newEventName); }} className={styles.form}>
								<input 
									type="text" 
									value={newEventName}
									onChange={(e) => setNewEventName(e.target.value)}
									placeholder="Nome nuova edizione (es. 2026)"
									className={styles.input}
								/>
								<button type="submit" className={styles.buttonAdd}>CREA EVENTO</button>
							</form>
							<div className={styles.eventList}>
								{events.map(e => (
									<div key={e.id} className={styles.eventItem}>
										<span>{e.name}</span>
										<div className="flex gap-2">
											{!e.is_active && (
												<button onClick={() => setActiveEventMutation.mutate(e.id)} className={styles.miniButton}>SET CURRENT</button>
											)}
											{e.is_active && (
												<span className={styles.activeBadge}>(Corrente)</span>
											)}
											{(!e.start_time || !e.is_active) && (
												<button 
													onClick={() => {
														if(confirm('ATTENZIONE: Sei sicuro di voler cancellare questo evento e TUTTI i suoi partecipanti? L\'azione è irreversibile.')) {
															deleteEventMutation.mutate(e.id);
														}
													}}
													className={styles.miniButton}
													style={{ color: '#dc2626' }}
												>
													ELIMINA
												</button>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Event Control Accordion */}
				<div className={styles.card}>
					<div 
						className={styles.accordionHeader} 
						onClick={() => setIsControlOpen(!isControlOpen)}
					>
						<h2 className={styles.cardTitle} style={{ marginBottom: 0 }}>
							Controllo Evento: {activeEvent?.name || 'NESSUNO'}
						</h2>
						<span className={styles.accordionIcon}>{isControlOpen ? '−' : '+'}</span>
					</div>

					{isControlOpen && (
						<div className={styles.accordionContent}>
							<div className={styles.eventStatusRow}>
								<div>
									<p className={styles.statusText}>Stato: <span className={activeEvent?.is_active ? styles.statusActive : styles.statusInactive}>
										{activeEvent?.is_active ? (activeEvent.start_time ? 'IN CORSO' : 'ATTIVO (PRONTO)') : 'NON SELEZIONATO'}
									</span></p>
									<p className={styles.timeText}>Inizio: {activeEvent?.start_time ? new Date(activeEvent.start_time).toLocaleString() : '-'}</p>
								</div>
								<div className="space-x-2">
									{!activeEvent?.start_time ? (
										<button 
											onClick={() => startEvent.mutate()}
											className={styles.buttonStart}
											disabled={!activeEvent}
										>
											START EVENT
										</button>
									) : (
										<div className="flex flex-col gap-2">
											<button 
												onClick={() => {
													if(confirm('Sei sicuro di voler terminare l\'evento? Non sarà più modificabile dai partecipanti.')) {
														finishEventMutation.mutate();
													}
												}}
												className={styles.buttonFinish}
												disabled={!activeEvent || !activeEvent.is_active}
											>
												FINISH EVENT
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Add Participant */}
				<div className={styles.card}>
					<h2 className={styles.cardTitle}>Aggiungi Partecipante a {activeEvent?.name}</h2>
					<form onSubmit={(e) => { e.preventDefault(); if(newName && activeEvent) addParticipantMutation.mutate(newName); }} className={styles.form}>
						<input 
							type="text" 
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							placeholder="Nome"
							className={styles.input}
							disabled={!activeEvent}
						/>
						<button 
							type="submit"
							className={styles.buttonAdd}
							disabled={!activeEvent}
						>
							AGGIUNGI
						</button>
					</form>
				</div>

				{/* Participants List */}
				<div className={styles.card}>
					<h2 className={styles.cardTitle}>Lista Partecipanti ({participants.length})</h2>
					<div className={styles.list}>
						{participants.map((p: Participant) => (
							<div key={p.id} className={styles.listItem}>
								<div className={styles.participantInfo}>
									<span className={styles.participantName}>{p.name}</span>
								</div>
								<div className={styles.participantActions}>
									<div className={styles.actionGroup}>
										<div className={styles.scoreRow}>
											<span className={styles.scoreLabel}>Backflips</span>
											<span className={styles.scoreValue}>{p.backflips}</span>
										</div>
										<div className={styles.buttonContainer}>
											<div className={styles.buttonRow}>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'backflips', amount: 1 })} className={styles.miniButton}>+1</button>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'backflips', amount: -1 })} className={styles.miniButton}>-1</button>
											</div>
											<div className={styles.buttonRow}>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'backflips', amount: 5 })} className={styles.miniButton}>+5</button>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'backflips', amount: 10 })} className={styles.miniButton}>+10</button>
											</div>
										</div>
									</div>
									<div className={styles.actionGroup}>
										<div className={styles.scoreRow}>
											<span className={styles.scoreLabel}>Piegamenti</span>
											<span className={styles.scoreValue}>{p.pushups}</span>
										</div>
										<div className={styles.buttonContainer}>
											<div className={styles.buttonRow}>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'pushups', amount: 1 })} className={styles.miniButton}>+1</button>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'pushups', amount: -1 })} className={styles.miniButton}>-1</button>
											</div>
											<div className={styles.buttonRow}>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'pushups', amount: 5 })} className={styles.miniButton}>+5</button>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'pushups', amount: 10 })} className={styles.miniButton}>+10</button>
											</div>
										</div>
									</div>
									<div className={styles.actionGroup}>
										<div className={styles.scoreRow}>
											<span className={styles.scoreLabel}>Trazioni</span>
											<span className={styles.scoreValue}>{p.pullups}</span>
										</div>
										<div className={styles.buttonContainer}>
											<div className={styles.buttonRow}>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'pullups', amount: 1 })} className={styles.miniButton}>+1</button>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'pullups', amount: -1 })} className={styles.miniButton}>-1</button>
											</div>
											<div className={styles.buttonRow}>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'pullups', amount: 5 })} className={styles.miniButton}>+5</button>
												<button onClick={() => updateScore.mutate({ id: p.id, field: 'pullups', amount: 10 })} className={styles.miniButton}>+10</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
