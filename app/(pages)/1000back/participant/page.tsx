'use client';

import { useParticipant } from '@/app/hooks/1000back/useParticipant';
import LoginGate from '@/app/components/Auth/LoginGate';
import styles from './participant.module.css';
import { Maintenance } from '@/app/components/Maintenance/Maintenance';
import { IS_MAINTENANCE_MODE } from '@/app/utils/maintenance';

export const dynamic = 'force-dynamic';

export default function ParticipantPage() {
	const {
		isAuthenticated,
		setIsAuthenticated,
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
		isLoading
	} = useParticipant();

	/*
	if (IS_MAINTENANCE_MODE) {
		return <Maintenance 
			title="Interfaccia Chiusa" 
			description="L'inserimento dei dati non è ancora attivo. Sarà disponibile durante l'evento ufficiale."
		/>;
	}
	*/

	if (isLoading) return null;
	
	if (isAuthenticated === false) {
		return <LoginGate mode="athlete" onSuccess={() => setIsAuthenticated(true)} />;
	}

	if (!activeEvent) {
		return (
			<div className={styles.container}>
				<div className={styles.card}>
					<h1 className={styles.title}>Nessun Evento Attivo</h1>
					<p>Torna più tardi.</p>
				</div>
			</div>
		);
	}

	if (!me) {
		return (
			<div className={styles.container}>
				<div className={styles.card}>
					<h1 className={styles.title}>Chi sei?</h1>
					<p className={styles.eventSubtitle}>{activeEvent.name}</p>
					
					<form onSubmit={(e) => { e.preventDefault(); if(nameInput.trim()) joinEvent.mutate(nameInput.trim()); }} className={styles.joinForm}>
						<input 
							type="text" 
							value={nameInput}
							onChange={(e) => setNameInput(e.target.value)}
							placeholder="Inserisci il tuo nome"
							className={styles.nameInput}
							required
						/>
						<button type="submit" className={styles.joinButton} disabled={joinEvent.isPending}>
							{joinEvent.isPending ? 'ENTRANDO...' : 'ENTRA'}
						</button>
					</form>

					<div className={styles.divider}>oppure seleziona</div>

					<div className={styles.nameList}>
						{participants.map(p => (
							<button
								key={p.id}
								onClick={() => setSelectedParticipantId(p.id)}
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

	return (
		<div className={styles.container}>
			<div className={styles.cardLarge}>
				<button 
					onClick={logoutParticipant}
					className={styles.backButton}
				>
					← Non sei tu? Cambia utente
				</button>
				<h1 className={styles.participantName}>{me?.name}</h1>
				<p className={styles.eventLabel}>
					{activeEvent.name} 
					{activeEvent.completed_at && <span className={styles.closedBadge}> - CHALLENGE COMPLETATA!</span>}
					{!activeEvent.completed_at && isEventClosed && <span className={styles.closedBadge}> - EVENTO CHIUSO</span>}
					{!isEventClosed && isNotStarted && <span className={styles.waitingBadge}> - IN ATTESA DI INIZIO</span>}
				</p>
				
				{isEventClosed && (
					<div className={styles.closedMessage}>
						Le modifiche sono disabilitate perché l&apos;evento è terminato.
					</div>
				)}

				{!isEventClosed && isNotStarted && (
					<div className={styles.waitingMessage}>
						L&apos;evento non è ancora iniziato. I pulsanti si attiveranno al via dell&apos;admin!
					</div>
				)}

				<div className={styles.exercisesGrid}>
					{/* Backflips Section */}
					<div className={styles.exerciseSection}>
						<div className={styles.counterContainer}>
							<div className={styles.counterValue}>{me?.backflips || 0}</div>
							<div className={styles.counterLabel}>Tuoi Backflips</div>
							<div className={styles.secondaryStats}>
								<div className={styles.statItem}>
									<span className={styles.statValueSmall}>{totals.backflips}</span>
									<span className={styles.statLabelSmall}>Totali</span>
								</div>
								<div className={styles.statItem}>
									<span className={styles.statValueSmall}>{targets.backflips}</span>
									<span className={styles.statLabelSmall}>Obiettivo</span>
								</div>
							</div>
						</div>
						<div className={styles.buttonGrid}>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'backflips', amount: 1 })} 
								className={styles.buttonPlus1}
								disabled={isEventClosed || isNotStarted}
							>+1</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'backflips', amount: 5 })} 
								className={styles.buttonPlusSmall}
								disabled={isEventClosed || isNotStarted}
							>+5</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'backflips', amount: 10 })} 
								className={styles.buttonPlusSmall}
								disabled={isEventClosed || isNotStarted}
							>+10</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'backflips', amount: -1 })} 
								className={styles.buttonMinus}
								disabled={isEventClosed || isNotStarted}
							>-1</button>
						</div>
					</div>

					{/* Pushups Section */}
					<div className={styles.exerciseSection}>
						<div className={styles.counterContainer}>
							<div className={styles.counterValue}>{me?.pushups || 0}</div>
							<div className={styles.counterLabel}>Tuoi Push-ups</div>
							<div className={styles.secondaryStats}>
								<div className={styles.statItem}>
									<span className={styles.statValueSmall}>{totals.pushups}</span>
									<span className={styles.statLabelSmall}>Totali</span>
								</div>
								<div className={styles.statItem}>
									<span className={styles.statValueSmall}>{targets.pushups}</span>
									<span className={styles.statLabelSmall}>Obiettivo</span>
								</div>
							</div>
						</div>
						<div className={styles.buttonGrid}>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'pushups', amount: 1 })} 
								className={styles.buttonPlus1}
								disabled={isEventClosed || isNotStarted}
							>+1</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'pushups', amount: 5 })} 
								className={styles.buttonPlusSmall}
								disabled={isEventClosed || isNotStarted}
							>+5</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'pushups', amount: 10 })} 
								className={styles.buttonPlusSmall}
								disabled={isEventClosed || isNotStarted}
							>+10</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'pushups', amount: -1 })} 
								className={styles.buttonMinus}
								disabled={isEventClosed || isNotStarted}
							>-1</button>
						</div>
					</div>

					{/* Pullups Section */}
					<div className={styles.exerciseSection}>
						<div className={styles.counterContainer}>
							<div className={styles.counterValue}>{me?.pullups || 0}</div>
							<div className={styles.counterLabel}>Tuoi Pull-ups</div>
							<div className={styles.secondaryStats}>
								<div className={styles.statItem}>
									<span className={styles.statValueSmall}>{totals.pullups}</span>
									<span className={styles.statLabelSmall}>Totali</span>
								</div>
								<div className={styles.statItem}>
									<span className={styles.statValueSmall}>{targets.pullups}</span>
									<span className={styles.statLabelSmall}>Obiettivo</span>
								</div>
							</div>
						</div>
						<div className={styles.buttonGrid}>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'pullups', amount: 1 })} 
								className={styles.buttonPlus1}
								disabled={isEventClosed || isNotStarted}
							>+1</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'pullups', amount: 5 })} 
								className={styles.buttonPlusSmall}
								disabled={isEventClosed || isNotStarted}
							>+5</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'pullups', amount: 10 })} 
								className={styles.buttonPlusSmall}
								disabled={isEventClosed || isNotStarted}
							>+10</button>
							<button 
								onClick={() => updateScore.mutate({ id: me!.id, field: 'pullups', amount: -1 })} 
								className={styles.buttonMinus}
								disabled={isEventClosed || isNotStarted}
							>-1</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
