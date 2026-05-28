'use client';

import { useState } from 'react';
import { loginAsAthlete, loginAsAdmin } from '@/app/services/1000Back/auth/apiAuth';
import styles from './login.module.css';

interface LoginGateProps {
	mode: 'athlete' | 'admin';
	onSuccess: () => void;
}

export default function LoginGate({ mode, onSuccess }: LoginGateProps) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			if (mode === 'athlete') {
				await loginAsAthlete(password);
			} else {
				await loginAsAdmin(password);
			}
			onSuccess();
		} catch (err) {
			setError('Password errata o errore di connessione.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1 className={styles.title}>
					{mode === 'athlete' ? 'Accesso Partecipante' : 'Accesso Amministratore'}
				</h1>
				<p className={styles.subtitle}>Inserisci la password dell&apos;evento per continuare.</p>
				
				<form onSubmit={handleLogin} className={styles.form}>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password dell'evento"
						className={styles.input}
						autoFocus
					/>
					{error && <p className={styles.error}>{error}</p>}
					<button 
						type="submit" 
						className={styles.button}
						disabled={loading || !password}
					>
						{loading ? 'ACCESSO IN CORSO...' : 'ACCEDI'}
					</button>
				</form>
			</div>
		</div>
	);
}
