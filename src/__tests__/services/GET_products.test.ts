import {GET_products} from '@services/GET_products';

describe('Service GET_products', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});

	const products = GET_products({page_size: 12, page_number: 1});
	const productsFilterd = GET_products({
		page_size: 12,
		page_number: 1,
		searchProductQuery: 'bronze',
	});

	test('should be have 100 length', () => {
		expect(products.data).toHaveLength(12);
	});

	test('should be have filtered data', () => {
		expect(productsFilterd.data).toBeTruthy();
	});

	test('check data type', () => {
		expect(products.data).toBeInstanceOf(Array);
		expect(typeof products.data[0] === 'object').toBeTruthy();
		expect(products.data[0] && typeof products.data[0].id).toBe('number');
		expect(products.data[0] && typeof products.data[0].weight).toBe('number');
		expect(products.data[0] && typeof products.data[0].height).toBe('number');
		expect(products.data[0] && typeof products.data[0].width).toBe('number');
		expect(products.data[0] && typeof products.data[0].harga).toBe('number');
		expect(products.data[0] && typeof products.data[0].length).toBe('number');
		expect(products.data[0] && typeof products.data[0].CategoryId).toBe(
			'number',
		);
		expect(products.data[0] && typeof products.data[0].categoryName).toBe(
			'string',
		);
		expect(products.data[0] && typeof products.data[0].sku).toBe('string');
		expect(products.data[0] && typeof products.data[0].description).toBe(
			'string',
		);
		expect(products.data[0] && typeof products.data[0].image).toBe('string');
		expect(products.data[0] && typeof products.data[0].name).toBe('string');
	});
});
