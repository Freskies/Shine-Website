import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script';
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/app/providers/QueryProvider";

export const metadata: Metadata = {
	title: "Shine — School of Movement",
	description: "Destroy limits, BUILD STRENGTH. Parkour courses for all ages.",
	icons: {
		icon: [
			{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
		],
		shortcut: "/favicon.ico",
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	manifest: "/site.webmanifest",
	appleWebApp: {
		title: "Shine",
	},
};

export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="it">
		<body
			suppressHydrationWarning
		>
		<Providers>
			{children}
		</Providers>
		<Analytics/>
		<SpeedInsights/>
		</body>
		</html>
	);
}
