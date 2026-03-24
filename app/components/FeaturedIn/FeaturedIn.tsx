'use client';

import Image from 'next/image';

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

	// noinspection LongLine
	return <section className="py-[3em] bg-zinc-50 overflow-hidden relative">
		<div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-white to-transparent pointer-events-none"/>
		<div className="max-w-7xl mx-auto px-[1em] relative z-10">
			<div className="flex justify-center items-center gap-[2em] sm:gap-[4em]">
				{logos.map((logo) => (
					<a
						key={logo.alt}
						href={logo.href}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:opacity-80 transition-opacity flex-1 max-w-30"
					>
						<Image
							src={logo.src}
							alt={logo.alt}
							width={120}
							height={60}
							className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
						/>
					</a>
				))}
			</div>
		</div>
	</section>;
};
