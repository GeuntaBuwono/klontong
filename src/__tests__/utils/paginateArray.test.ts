import {paginateArray} from '@utils/paginateArray';

describe('Paginate Array', () => {
	const dataForTest = Array.from({length: 100});

	test('should be run correctly', () => {
		const {data, isHasMore} = paginateArray({
			data: dataForTest,
			page_number: 1,
			page_size: 10,
		});

		expect(data).toHaveLength(10);
		expect(isHasMore).toBeTruthy();
	});

	test('should be not has more', () => {
		const {data, isHasMore} = paginateArray({
			data: dataForTest,
			page_number: 1,
			page_size: 200,
		});

		expect(data).toHaveLength(100);
		expect(isHasMore).toBeFalsy();
	});

	test('page_number 0 should be error', () => {
		expect(() =>
			paginateArray({
				data: dataForTest,
				page_number: 0,
				page_size: 12,
			}),
		).toThrow('page number must be more than 0');
	});
});
