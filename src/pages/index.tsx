import Head from 'next/head';

export default function Home() {
	return (
		<div className="px-8">
			<Head>
				<title>Klontong</title>
				<meta name="description" content="Klontong Web Description" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-1 justify-center items-center content-center py-16 min-h-screen">
				<h1 className="text-4xl font-bold underline">
					Hello world! here from tailwinds css
				</h1>
			</main>
		</div>
	);
}
