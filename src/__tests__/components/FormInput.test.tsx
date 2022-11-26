import FormInput from '@components/FormInput/FormInput';
import {fireEvent, render, screen} from '@testing-library/react';

describe('FormInput', () => {
	const testElement = (
		<FormInput
			placeholder="placeholder testing"
			value={undefined}
			id="testing"
			label="testing"
			onBlur={jest.fn()}
			onChange={jest.fn()}
		/>
	);

	const testElementWithError = (
		<FormInput
			placeholder="placeholder testing"
			value={undefined}
			errorMessage="has an error"
			id="testing"
			label="testing"
			onBlur={jest.fn()}
			onChange={jest.fn()}
		/>
	);

	test('snapshot', () => {
		expect(testElement).toMatchSnapshot();
	});

	test('render correctly', () => {
		render(testElement);
		const testInput = screen.getByRole('textbox', {
			name: 'testing',
		});
		expect(testInput).toBeInTheDocument();
	});

	test('get initial value', () => {
		render(testElement);
		const testInput = screen.getByRole('textbox', {
			name: 'testing',
		});
		expect(testInput).toHaveDisplayValue('');
	});

	test('has an error', () => {
		render(testElementWithError);
		const testInput = screen.getByText('has an error');
		expect(testInput).toBeTruthy();
	});

	test('update value', () => {
		render(testElement);
		const testInput = screen.getByRole('textbox', {
			name: 'testing',
		});

		fireEvent.change(testInput, {
			target: {
				value: 'update testing value',
			},
		});

		expect(testInput).toHaveDisplayValue('update testing value');
	});
});
