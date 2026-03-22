'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function TeamPage() {
	const { t } = useTranslation();

	const team = [
		{ id: 'coach-1', name: 'Coach 1', role: 'Head Coach' },
		{ id: 'coach-2', name: 'Coach 2', role: 'Instructor' },
		{ id: 'coach-3', name: 'Coach 3', role: 'Instructor' },
	];

	return <div className="flex flex-col min-h-screen">
		<Header />
		<main className="pt-[6em] pb-[4em] px-[1em]">
			<div className="max-w-[80rem] mx-auto text-center">
				<h1 className="text-[3.5em] font-bold mb-[1em]">{t.team.title}</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3em]">
					{team.map((member) => (
						<Link href={`/team/${member.id}`} key={member.id} className="group block text-center">
							<div className="relative w-full aspect-square rounded-[2em] overflow-hidden mb-[1.5em] shadow-sm group-hover:shadow-xl transition-all duration-300">
								<div className="absolute inset-0 bg-zinc-200 animate-pulse -z-10" />
								<Image
									src="/logo_shine_circle.avif"
									alt={member.name}
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-500"
								/>
							</div>
							<h3 className="text-[1.5em] font-bold mb-[0.2em]">{member.name}</h3>
							<p className="text-zinc-500 uppercase tracking-widest text-[0.8em]">{member.role}</p>
						</Link>
					))}
				</div>
			</div>
		</main>
		<Footer />
	</div>;
}
