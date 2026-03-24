export const translations = {
	it: {
		header: {
			home: "Home",
			about: "Chi Siamo",
			map: "Mappa",
		},
		hero: {
			title: "Destroy limits,\nBUILD STRENGTH",
			description: "Corsi di parkour per tutte le età",
			cta: "Esplora i nostri corsi",
		},
		courses: {
			title: "I Nostri Corsi",
			ageRange: "Età",
			schedule: "Orario",
			cta: "Scopri di più",
			kids: "Bambini",
			teens: "Ragazzi",
			adults: "Adulti",
			days: {
				mon: "Lun",
				tue: "Mar",
				wed: "Mer",
				thu: "Gio",
				fri: "Ven",
				sat: "Sab",
				sun: "Dom",
			},
		},
		pricing: {
			title: "Prezzi",
			singleLesson: "15€ lezione singola",
			multiLesson: "70€ 5+ lezioni",
			paymentInfo: "Si paga alla fine del mese in base alle lezioni seguite.",
		},
		bookLesson: {
			title: "Prenota una lezione di prova gratuita",
			cta: "Prenota ora",
			placeholder: "Questa sezione sarà implementata a breve.",
		},
		footer: {
			bankInfo: "COORDINATE BANCARIE",
			accountHolder: "Intestatario: SHINE A.S.D.",
			iban: "IBAN: IT11V0306967684510745671712",
			fiscalCode: "Codice Fiscale: 92079540396",
			vat: "P. Iva 02509640393",
		},
		about: {
			title: "Chi Siamo",
			story: "La nostra storia...",
			parkourStory: "Storia del Parkour...",
			whyParkour: "Perché fare Parkour?",
			gym: "La nostra palestra...",
		},
		team: {
			title: "Il Nostro Team",
		},
		map: {
			title: "Mappa degli Spot",
		},
		maintenance: {
			title: "Sito in Sviluppo",
			description: "Ci scusiamo, il sito di Shine è attualmente in fase di sviluppo. Stiamo lavorando sodo per offrirti la migliore esperienza al più presto!",
			contact: "HAI BISOGNO DI INFORMAZIONI?",
		},
	},
	en: {
		header: {
			home: "Home",
			about: "About",
			map: "Map",
		},
		hero: {
			title: "Destroy limits,\nBUILD STRENGTH",
			description: "Parkour courses for all ages",
			cta: "Explore our courses",
		},
		courses: {
			title: "Our Courses",
			ageRange: "Age Range",
			schedule: "Schedule",
			cta: "Learn more",
			kids: "Kids",
			teens: "Teens",
			adults: "Adults",
			days: {
				mon: "Mon",
				tue: "Tue",
				wed: "Wed",
				thu: "Thu",
				fri: "Fri",
				sat: "Sat",
				sun: "Sun",
			},
		},
		pricing: {
			title: "Pricing",
			singleLesson: "15€ single lesson",
			multiLesson: "70€ 5+ lessons",
			paymentInfo: "You pay at the end of the month based on the lessons you followed.",
		},
		bookLesson: {
			title: "Book a free trial lesson",
			cta: "Book now",
			placeholder: "This section will be implemented later.",
		},
		footer: {
			bankInfo: "BANK DETAILS",
			accountHolder: "Holder: SHINE A.S.D.",
			iban: "IBAN: IT11V0306967684510745671712",
			fiscalCode: "Tax Code: 92079540396",
			vat: "VAT: 02509640393",
		},
		about: {
			title: "About Us",
			story: "Our story...",
			parkourStory: "Story of Parkour...",
			whyParkour: "Why do Parkour?",
			gym: "Our gym...",
		},
		team: {
			title: "Our Team",
		},
		map: {
			title: "Spot Map",
		},
		maintenance: {
			title: "Website Under Development",
			description: "We're sorry, but the Shine website is currently under development. We are working hard to bring you the best experience soon!",
			contact: "NEED MORE INFORMATION?",
		},
	},
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.it;
