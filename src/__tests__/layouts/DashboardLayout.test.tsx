import DashboardLayout from '@layouts/DashboardLayout';
import {render, screen} from '@testing-library/react';
import mockRouter from 'next-router-mock';
import singletonRouter from 'next/router';

describe('Dashboard Layout', () => {
	beforeEach(() => {
		mockRouter.setCurrentUrl('/');
	});

	const testElement = (
		<DashboardLayout pageTitle="Testing">Testing</DashboardLayout>
	);

	test('snapshot', () => {
		expect(testElement).toMatchSnapshot();
	});

	test('render', () => {
		render(testElement);
		const heading = screen.getByRole('heading', {
			name: /Testing/i,
			level: 1,
		});
		expect(heading).toBeInTheDocument();
	});

	test('detail product', () => {
		singletonRouter.push('/dashboard/product/[id]');

		render(testElement);
		const navElement = document.querySelector('nav');
		expect(navElement?.className).toBe('h-16 px-4 bg-yellow-200 flex');
	});
});
