import Head from 'next/head';
import React from 'react';

const Meta = () => (
	<Head>
		<title>Klontong</title>
		<meta name="description" content="Klontong Web Description" />
		<link rel="icon" href="/favicon.ico" />
	</Head>
);

type MainProps = {children: React.ReactNode};

const Main = ({children}: {children: React.ReactNode}) => (
	<main className="flex flex-1 flex-col justify-center items-center content-center py-16 min-h-screen">
		{children}
	</main>
);
const Footer = () => (
	<footer className="flex flex-1 py-8 border-t-2 border-t-slate-300 content-center items-center">
		<p className="flex content-center items-center flex-grow justify-center">
			Klontong {new Date().getFullYear()}
		</p>
	</footer>
);

type DashboardLayoutProps = unknown & MainProps;

export default function DashboardLayout({children}: DashboardLayoutProps) {
	return (
		<div className="px-8">
			<Meta />
			<Main>{children}</Main>
			<Footer />
		</div>
	);
}
