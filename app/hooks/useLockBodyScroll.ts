import { useEffect } from 'react';

export const useLockBodyScroll = (lock: boolean) => {
	useEffect(() => {
		if (lock) {
			const originalStyle = window.getComputedStyle(document.body).overflow;
			document.body.style.overflow = 'hidden';
			// Prevenire anche lo scroll su iOS
			document.body.style.height = '100%';
			return () => {
				document.body.style.overflow = originalStyle;
				document.body.style.height = '';
			};
		}
	}, [lock]);
};
