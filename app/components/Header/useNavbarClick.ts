'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export const useNavbarClick = () => {
	const pathname = usePathname();

	return (targetPath: string) => (e: React.MouseEvent) => {
		if (pathname === targetPath) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};
};
