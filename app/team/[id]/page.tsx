'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function TeamDetailPage() {
	const { id } = useParams();
	const { t } = useTranslation();

	return <div className="flex flex-col min-h-screen">
		<Header />
		<main className="pt-[6em] pb-[4em] px-[1em]">
			<div className="max-w-[60rem] mx-auto">
				<div className="flex flex-col md:flex-row gap-[4em] items-start">
					<div className="relative w-full md:w-[20rem] h-[25rem] rounded-[2em] overflow-hidden">
						<div className="absolute inset-0 bg-zinc-200 animate-pulse -z-10" />
						<Image
							src="/temp/logo_shine_circle.avif"
							alt="Team Member Placeholder"
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex-1">
						<h1 className="text-[3.5em] font-bold mb-[0.2em]">{id}</h1>
						<p className="text-[1.2em] text-red-600 font-bold mb-[2em] uppercase tracking-widest">Team Member</p>
						
						<section className="mb-[3em]">
							<h2 className="text-[1.5em] font-bold mb-[1em]">History with Parkour</h2>
							<p className="text-zinc-600 leading-relaxed">History with pk formation, shine and parkour in general placeholder.</p>
						</section>

						<section className="mb-[3em]">
							<h2 className="text-[1.5em] font-bold mb-[1em]">Role in Shine</h2>
							<p className="text-zinc-600 leading-relaxed">Description of their role and contribution to the association.</p>
						</section>
					</div>
				</div>
			</div>
		</main>
		<Footer />
	</div>;
}
