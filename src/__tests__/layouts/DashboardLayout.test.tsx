import {render, screen} from '@testing-library/react';
import DashboardLayout from '@layouts/DashboardLayout';

describe('Dashboard Layout', () => {
	const testElement = <DashboardLayout>Testing</DashboardLayout>;
	test('snapshot', () => {
		expect(testElement).toMatchSnapshot();
	});
	test('render', () => {
		render(testElement);
		const heading = screen.getByText('Testing');
		expect(heading).toBeInTheDocument();
	});
});
