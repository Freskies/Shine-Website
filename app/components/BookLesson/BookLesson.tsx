'use client';

import { useTranslation } from '@/app/hooks/useTranslation';

export const BookLesson = ({ courseName }: { courseName?: string }) => {
	const { t } = useTranslation();

	return <section id="book-lesson" className="py-[6em] px-[1em] bg-zinc-100 text-center">
		<div className="max-w-[50rem] mx-auto">
			<h2 className="text-[2.5em] font-bold mb-[0.5em] leading-tight">{t.bookLesson.title}</h2>
			{courseName && <p className="text-[1.2em] mb-[1.5em] italic">{courseName}</p>}
			<p className="mb-[2em]">{t.bookLesson.placeholder}</p>
			<div className="inline-block bg-zinc-900 text-white px-[2em] py-[1em] rounded-full font-bold opacity-50 cursor-not-allowed">
				{t.bookLesson.cta}
			</div>
		</div>
	</section>;
};
