import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Testimonials',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn(inter.className, 'bg-transparent')}>
				<NuqsAdapter>{children}</NuqsAdapter>
			</body>
		</html>
	);
}
