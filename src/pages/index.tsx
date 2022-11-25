import DashboardLayout from '@layouts/DashboardLayout';
import Link from 'next/link';

export default function Home() {
	return (
		<DashboardLayout isCenterContent pageTitle="Klontong">
			<Link href="/" className="border-blue-400 border-2 p-2 text-2xl">
				<h3>Product</h3>
			</Link>
		</DashboardLayout>
	);
}
