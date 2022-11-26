import FormUploadImage from '@components/Form/FormUploadImage';
import {render, screen} from '@testing-library/react';

describe('FormUploadImage', () => {
	const testElement = (
		<FormUploadImage
			placeholder="placeholder testing"
			id="uploadImage"
			onBlur={jest.fn()}
			onChange={jest.fn()}
		/>
	);

	const testElementWithError = (
		<FormUploadImage
			placeholder="placeholder testing"
			errorMessage="has an error"
			id="uploadImage"
			onBlur={jest.fn()}
			onChange={jest.fn()}
		/>
	);

	test('snapshot', () => {
		expect(testElement).toMatchSnapshot();
	});

	test('render correctly', () => {
		render(testElement);
		const testInput = screen.getByLabelText('placeholder testing');
		expect(testInput).toBeInTheDocument();
	});

	test('has an error', () => {
		render(testElementWithError);
		const testInput = screen.getByLabelText('placeholder testing');
		expect(testInput).toBeTruthy();
	});
});
