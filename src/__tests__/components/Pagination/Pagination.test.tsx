import {Pagination} from '@components/Pagination/Pagination';
import {render} from '@testing-library/react';

describe('Pagination', () => {
	const testElement = (
		<Pagination
			onClickPrev={jest.fn()}
			onClickNext={jest.fn()}
			activePage={1}
			isHasNextPage={false}
		/>
	);
	test('snapshot', () => {
		expect(testElement).toMatchSnapshot();
	});

	test('check activePage className', () => {
		render(testElement);
		const testActivePage = document.getElementsByClassName('active');
		expect(testActivePage).toBeTruthy();
	});
});
