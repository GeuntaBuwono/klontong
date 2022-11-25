import {render, screen} from '@testing-library/react';
import DashboardLayout from '@layouts/DashboardLayout';

describe('Dashboard Layout', () => {
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
});
