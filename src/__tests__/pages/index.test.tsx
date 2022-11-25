import Home from '@pages/index';
import {render, screen} from '@testing-library/react';

describe('Homepage', () => {
	test('should be rendered', () => {
		render(<Home />);

		const heading = screen.getByRole('heading', {
			name: /Klontong/i,
		});

		expect(heading).toBeInTheDocument();
	});
});
