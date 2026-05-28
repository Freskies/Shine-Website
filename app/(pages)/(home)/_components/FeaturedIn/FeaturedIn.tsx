'use client';

import Image from 'next/image';

import styles from './FeaturedIn.module.css';

export const FeaturedIn = () => {
	const logos = [
		{ src: '/featured-in-logos/logo_coni.avif', alt: 'CONI', href: 'https://www.coni.it/it/' },
		{ src: '/featured-in-logos/logo_uisp.avif', alt: 'UISP', href: 'https://www.uisp.it/nazionale/' },
		{
			src: '/featured-in-logos/logo_adapt.avif',
			alt: 'ADAPT',
			href: 'https://adaptqualifications.com/?srsltid=AfmBOoqb2hOvLmr31mpbpaDWyEmnffzxT-p8p15ChTmBH8eXhwlzD8w2'
		},
	];

	return <section className={styles.featuredSection}>
		<div className={styles.overlay}/>
		<div className={styles.container}>
			<div className={styles.logoGrid}>
				{logos.map((logo) => (
					<a
						key={logo.alt}
						href={logo.href}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.logoLink}
					>
						<Image
							src={logo.src}
							alt={logo.alt}
							width={100}
							height={100}
							className={styles.logoImage}
						/>
					</a>
				))}
			</div>
		</div>
	</section>;
};
