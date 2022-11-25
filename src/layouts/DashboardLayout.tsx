import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';

const Meta = () => (
	<Head>
		<title>Klontong</title>
		<meta name="description" content="Klontong Web Description" />
		<link rel="icon" href="/favicon.ico" />
	</Head>
);

const Navigation = () => {
	const router = useRouter();
	const isDetailProduct = router.pathname === '/dashboard/product/[id]';

	const navigationClassName = classNames(
		'h-16 px-4 bg-yellow-200',
		isDetailProduct ? 'flex' : 'hidden',
	);

	return (
		<nav className={navigationClassName}>
			<Link
				href="/dashboard/product"
				className="flex flex-1 items-center px-4 h-full cursor-pointer"
			>
				<p className="text-2xl mr-2">&#5130;</p>
				<p>Back</p>
			</Link>
		</nav>
	);
};

type MainProps = {
	children: React.ReactNode;
	pageTitle: string;
	isCenterContent?: boolean;
};

const Main = ({children, pageTitle, isCenterContent}: MainProps) => {
	const mainClass = classNames(
		'flex flex-1 flex-col items-center content-center py-8 min-h-screen px-8 pb-20',
		isCenterContent ? 'justify-center' : '',
	);

	return (
		<main className={mainClass}>
			<div className="pb-2">
				<h1 className="text-4xl font-bold">{pageTitle}</h1>
			</div>
			{children}
		</main>
	);
};
const Footer = () => (
	<footer className="flex flex-1 py-8 border-t-2 border-t-slate-300 content-center items-center">
		<p className="flex content-center items-center flex-grow justify-center">
			Klontong {new Date().getFullYear()}
		</p>
	</footer>
);

type DashboardLayoutProps = unknown & MainProps;

export default function DashboardLayout({
	children,
	pageTitle,
	isCenterContent,
}: DashboardLayoutProps) {
	return (
		<div>
			<Meta />
			<Navigation />
			<Main isCenterContent={isCenterContent} pageTitle={pageTitle}>
				{children}
			</Main>
			<Footer />
		</div>
	);
}
