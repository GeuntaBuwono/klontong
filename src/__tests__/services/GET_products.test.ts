import {GET_products} from '@services/GET_products';

describe('Service GET_products', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});

	const products = GET_products();

	test('should be have 10 length', () => {
		expect(products).toHaveLength(10);
	});

	test('check data type', () => {
		expect(products).toBeInstanceOf(Array);
		expect(typeof products[0] === 'object').toBeTruthy();
		expect(products[0] && typeof products[0].id).toBe('number');
		expect(products[0] && typeof products[0].weight).toBe('number');
		expect(products[0] && typeof products[0].height).toBe('number');
		expect(products[0] && typeof products[0].width).toBe('number');
		expect(products[0] && typeof products[0].harga).toBe('number');
		expect(products[0] && typeof products[0].length).toBe('number');
		expect(products[0] && typeof products[0].CategoryId).toBe('number');
		expect(products[0] && typeof products[0].categoryName).toBe('string');
		expect(products[0] && typeof products[0].sku).toBe('string');
		expect(products[0] && typeof products[0].description).toBe('string');
		expect(products[0] && typeof products[0].image).toBe('string');
		expect(products[0] && typeof products[0].name).toBe('string');
	});
});
