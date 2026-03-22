'use client';

import Image from 'next/image';

export const FeaturedIn = () => {
	const logos = [
		{ src: '/featured-in-logos/logo_coni.avif', alt: 'CONI' },
		{ src: '/featured-in-logos/logo_uisp.avif', alt: 'UISP' },
		{ src: '/featured-in-logos/logo_adapt.avif', alt: 'ADAPT' },
	];

	return <section className="py-[3em] bg-zinc-50 overflow-hidden relative">
		<div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-white to-transparent pointer-events-none" />
		<div className="max-w-7xl mx-auto px-[1em] relative z-10">
			<div className="flex flex-wrap justify-center items-center gap-[4em]">
				{logos.map((logo) => (
					<Image
						key={logo.alt}
						src={logo.src}
						alt={logo.alt}
						width={120}
						height={60}
						className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
					/>
				))}
			</div>
		</div>
	</section>;
};
