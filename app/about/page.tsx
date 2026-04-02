'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/about/2009');
	}, [router]);

	return null;
}
