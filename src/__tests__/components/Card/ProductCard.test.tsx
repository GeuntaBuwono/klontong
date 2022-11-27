import {ProductCard, ProductCardSkeleton} from '@components/Card/ProductCard';
import {render, screen} from '@testing-library/react';

describe('ProductCardSkeleton', () => {
	const testElement = <ProductCardSkeleton />;
	test('snapshot', () => {
		expect(testElement).toMatchSnapshot();
	});

	test('render correctly', () => {
		render(testElement);
		const testInput = document.getElementsByClassName(
			'border border-blue-300 shadow rounded-md max-w-sm w-full mx-auto',
		);
		expect(testInput).toBeTruthy();
	});
});

describe('ProductCard', () => {
	const testElement = (
		<ProductCard
			description="testing description"
			onClickDelete={jest.fn()}
			name="testing name"
			harga={5000}
			id={1}
			image="https://loremflickr.com/640/480/abstract?random=1669555427495"
		/>
	);

	test('snapshot', () => {
		expect(testElement).toMatchSnapshot();
	});

	test('render correctly', () => {
		render(testElement);
		const testButton = screen.getByRole('button', {
			name: 'Remove Product',
		});

		const testImage = screen.getByRole('img', {
			name: 'testing description',
		});

		expect(testButton).toBeTruthy();
		expect(testImage).toBeTruthy();
	});
});
