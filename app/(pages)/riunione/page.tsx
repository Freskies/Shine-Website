'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import styles from './riunione.module.css';

interface CourseConfig {
	name: string;
	students: number;
	certifiedInstructors: number;
}

export default function RiunionePage () {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	// Costi Fissi
	const [presidente, setPresidente] = useState(500);
	const [vicePresidente, setVicePresidente] = useState(100);
	const [tesoriere, setTesoriere] = useState(100);
	const [segretario, setSegretario] = useState(100);
	const [affitto, setAffitto] = useState(200);

	// Costi Lezioni
	const [lezioneSingola, setLezioneSingola] = useState(15);
	const [capMensile, setCapMensile] = useState(70);

	// Costi Istruttori
	const [pagaCertificato, setPagaCertificato] = useState(15);
	const [pagaNonCertificato, setPagaNonCertificato] = useState(9);

	// Corsi
	const [courses, setCourses] = useState<CourseConfig[]>([
		{ name: '6-9 anni', students: 10, certifiedInstructors: 1 },
		{ name: '9-14 anni', students: 10, certifiedInstructors: 1 },
		{ name: '14+ anni', students: 10, certifiedInstructors: 1 },
	]);

	const updateCourse = (index: number, field: keyof CourseConfig, value: number) => {
		const newCourses = [...courses];
		newCourses[index] = { ...newCourses[index], [field]: value };

		// Validazione istruttori
		if (field === 'students' || field === 'certifiedInstructors') {
			const students = newCourses[index].students;
			let totalNeeded = 1;
			if (students >= 7 && students <= 14) totalNeeded = 2;
			else if (students >= 15) totalNeeded = 3;

			// Se abbiamo cambiato gli studenti, assicuriamoci che i certificati non superino il totale necessario
			// e che siano almeno 1. In realtà l'utente decide quanti certificati.
			// Il resto saranno non certificati.
			if (newCourses[index].certifiedInstructors > totalNeeded) {
				newCourses[index].certifiedInstructors = totalNeeded;
			}
			if (newCourses[index].certifiedInstructors < 1) {
				newCourses[index].certifiedInstructors = 1;
			}
		}

		setCourses(newCourses);
	};

	const totals = useMemo(() => {
		const mesiLavoro = 9;
		const mesiTotali = 12;
		const lezioniMese = 8;
		const oreLezione = 1.5; // Assumiamo 1.5 ore per lezione come media dai dati esistenti

		const costiFissiMensili = presidente + vicePresidente + tesoriere + segretario + affitto;
		const costiFissiAnnuali = costiFissiMensili * mesiTotali;

		let costiIstruttoriTotali = 0;
		let totaleIscritti = 0;

		courses.forEach(course => {
			totaleIscritti += course.students;

			let totalInstructors = 1;
			if (course.students >= 7 && course.students <= 14) totalInstructors = 2;
			else if (course.students >= 15) totalInstructors = 3;

			const nonCertified = Math.max(0, totalInstructors - course.certifiedInstructors);

			const costoLezioneIstruttori = (course.certifiedInstructors * pagaCertificato + nonCertified * pagaNonCertificato) * oreLezione;
			const costoMensileIstruttori = costoLezioneIstruttori * lezioniMese;

			costiIstruttoriTotali += costoMensileIstruttori * mesiLavoro;
		});

		const spesaTotaleAnnua = costiFissiAnnuali + costiIstruttoriTotali;
		const breakEvenMensilePerIscritto = totaleIscritti > 0 ? (spesaTotaleAnnua / mesiLavoro) / totaleIscritti : 0;

		const entrateMensiliCorsi = totaleIscritti * capMensile;
		const entrateAnnualiCorsi = entrateMensiliCorsi * mesiLavoro;
		const differenzaEventi = Math.max(0, spesaTotaleAnnua - entrateAnnualiCorsi);

		return {
			costiFissiAnnuali,
			costiIstruttoriTotali,
			spesaTotaleAnnua,
			breakEvenMensilePerIscritto,
			totaleIscritti,
			entrateAnnualiCorsi,
			differenzaEventi
		};
	}, [presidente, vicePresidente, tesoriere, segretario, affitto, pagaCertificato, pagaNonCertificato, courses, capMensile]);

	return (
		<>
			<Header/>
			<main className={styles.container}>
				<h1 className={styles.title}>Simulatore Nuovo Anno Parkour</h1>

				<section className={styles.section}>
					<h2>Costi Fissi Mensili</h2>
					<div className={styles.grid}>
						<div className={styles.inputGroup}>
							<label>Presidente: {presidente}€</label>
							<input type="range" min="300" max="500" step="50" value={presidente}
							       onChange={(e) => setPresidente(Number(e.target.value))}/>
						</div>
						<div className={styles.inputGroup}>
							<label>Vice Presidente: {vicePresidente}€</label>
							<input type="range" min="80" max="150" step="10" value={vicePresidente}
							       onChange={(e) => setVicePresidente(Number(e.target.value))}/>
						</div>
						<div className={styles.inputGroup}>
							<label>Tesoriere: {tesoriere}€</label>
							<input type="range" min="80" max="150" step="10" value={tesoriere}
							       onChange={(e) => setTesoriere(Number(e.target.value))}/>
						</div>
						<div className={styles.inputGroup}>
							<label>Segretario: {segretario}€</label>
							<input type="range" min="80" max="150" step="10" value={segretario}
							       onChange={(e) => setSegretario(Number(e.target.value))}/>
						</div>
						<div className={styles.inputGroup}>
							<label>Affitto: {affitto}€</label>
							<input type="range" min="0" max="800" step="50" value={affitto}
							       onChange={(e) => setAffitto(Number(e.target.value))}/>
						</div>
					</div>
				</section>

				<section className={styles.section}>
					<h2>Costi Istruttori (Paga Oraria)</h2>
					<div className={styles.grid}>
						<div className={styles.inputGroup}>
							<label>Certificati: {pagaCertificato}€/h</label>
							<input type="range" min="10" max="20" step="1" value={pagaCertificato}
							       onChange={(e) => setPagaCertificato(Number(e.target.value))}/>
						</div>
						<div className={styles.inputGroup}>
							<label>Non Certificati: {pagaNonCertificato}€/h</label>
							<input type="range" min="5" max="12" step="1" value={pagaNonCertificato}
							       onChange={(e) => setPagaNonCertificato(Number(e.target.value))}/>
						</div>
					</div>
				</section>

				<section className={styles.section}>
					<h2>Corsi</h2>
					{courses.map((course, index) => {
						let totalNeeded = 1;
						if (course.students >= 7 && course.students <= 14) totalNeeded = 2;
						else if (course.students >= 15) totalNeeded = 3;

						return (
							<div key={index} className={styles.courseRow}>
								<h3>{course.name}</h3>
								<div className={styles.grid}>
									<div className={styles.inputGroup}>
										<label>Iscritti: {course.students}</label>
										<input type="range" min="2" max="25" step="1" value={course.students}
										       onChange={(e) => updateCourse(index, 'students', Number(e.target.value))}/>
									</div>
									<div className={styles.inputGroup}>
										<label>Istruttori
											Certificati: {course.certifiedInstructors} (su {totalNeeded} totali)</label>
										<input type="range" min="1" max={totalNeeded} step="1" value={course.certifiedInstructors}
										       onChange={(e) => updateCourse(index, 'certifiedInstructors', Number(e.target.value))}/>
									</div>
								</div>
							</div>
						);
					})}
				</section>

				<section className={`${styles.section} ${styles.results}`}>
					<h2>Risultati Annuali</h2>
					<div className={styles.resultGrid}>
						<div className={styles.resultItem}>
							<span>Costi Fissi (12 mesi):</span>
							<strong>{mounted ? totals.costiFissiAnnuali.toLocaleString() : '...'}€</strong>
						</div>
						<div className={styles.resultItem}>
							<span>Costi Istruttori (9 mesi):</span>
							<strong>{mounted ? totals.costiIstruttoriTotali.toLocaleString() : '...'}€</strong>
						</div>
						<div className={styles.resultItem}>
							<span>Spesa Totale:</span>
							<strong>{mounted ? totals.spesaTotaleAnnua.toLocaleString() : '...'}€</strong>
						</div>
						<div className={styles.resultItem}>
							<span>Totale Iscritti:</span>
							<strong>{totals.totaleIscritti}</strong>
						</div>
						<div className={`${styles.resultItem} ${styles.highlight}`}>
							<span>Break-even Mensile per Iscritto:</span>
							<strong>{mounted ? totals.breakEvenMensilePerIscritto.toFixed(2) : '...'}€</strong>
						</div>
					</div>
					<p className={styles.note}>
						Il break-even indica quanto ogni iscritto dovrebbe pagare mediamente al mese (per i 9 mesi di
						attività)
						per coprire tutti i costi (inclusi i costi fissi dei 3 mesi di stacco).
					</p>
				</section>

				<section className={styles.section}>
					<h2>Costi Lezioni (Simulazione Entrate)</h2>
					<div className={styles.grid}>
						<div className={styles.inputGroup}>
							<label>Lezione Singola: {lezioneSingola}€</label>
							<input type="range" min="10" max="20" step="1" value={lezioneSingola}
							       onChange={(e) => setLezioneSingola(Number(e.target.value))}/>
						</div>
						<div className={styles.inputGroup}>
							<label>Cap Mensile: {capMensile}€</label>
							<input type="range" min="50" max="80" step="1" value={capMensile}
							       onChange={(e) => setCapMensile(Number(e.target.value))}/>
						</div>
					</div>
				</section>
				<section className={`${styles.section} ${styles.events}`}>
					<h2>Obiettivo Eventi e Iniziative Extra</h2>
					<p>
						Se impostiamo un Cap Mensile fisso per gli iscritti, quanto dobbiamo raccogliere tramite altre
						attività per coprire i costi?
					</p>
					<div className={styles.resultGrid}>
						<div className={styles.resultItem}>
							<span>Cap Mensile impostato:</span>
							<strong>{capMensile}€</strong>
						</div>
						<div className={styles.resultItem}>
							<span>Entrate Annuali dai Corsi:</span>
							<strong>{mounted ? totals.entrateAnnualiCorsi.toLocaleString() : '...'}€</strong>
						</div>
						<div
							className={`${styles.resultItem} ${totals.differenzaEventi > 0 ? styles.warning : styles.highlight}`}>
							<span>Da coprire con Eventi:</span>
							<strong>{mounted ? totals.differenzaEventi.toLocaleString() : '...'}€</strong>
						</div>
					</div>
					<p className={styles.note}>
						Questo calcolo considera le entrate derivanti dal cap mensile per 9 mesi di attività e le confronta
						con la spesa totale annua (12 mesi di costi fissi + 9 mesi di istruttori).
					</p>
				</section>
			</main>
			<Footer/>
		</>
	);
}
