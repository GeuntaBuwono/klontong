import DashboardLayout from '@layouts/DashboardLayout';
import Link from 'next/link';

export default function Home() {
	return (
		<DashboardLayout>
			<div className="pb-2">
				<h1 className="text-4xl font-bold">Klontong</h1>
			</div>
			<Link href="/" className="border-blue-400 border-2 p-2 text-2xl">
				<h3>Product</h3>
			</Link>
		</DashboardLayout>
	);
}
