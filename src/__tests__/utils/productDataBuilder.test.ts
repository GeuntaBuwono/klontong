import {productDataBuilder} from '@utils/productDataBuilder';

describe('Product Data Builder', () => {
	test('should be have 100 length', () => {
		const testValue = productDataBuilder();
		expect(testValue).toHaveLength(100);
	});

	test('check data type', () => {
		const testValue = productDataBuilder();
		expect(testValue).toBeInstanceOf(Array);
		expect(typeof testValue[0] === 'object').toBeTruthy();
		expect(testValue[0] && typeof testValue[0].id).toBe('number');
		expect(testValue[0] && typeof testValue[0].weight).toBe('number');
		expect(testValue[0] && typeof testValue[0].height).toBe('number');
		expect(testValue[0] && typeof testValue[0].width).toBe('number');
		expect(testValue[0] && typeof testValue[0].harga).toBe('number');
		expect(testValue[0] && typeof testValue[0].length).toBe('number');
		expect(testValue[0] && typeof testValue[0].CategoryId).toBe('number');
		expect(testValue[0] && typeof testValue[0].categoryName).toBe('string');
		expect(testValue[0] && typeof testValue[0].sku).toBe('string');
		expect(testValue[0] && typeof testValue[0].description).toBe('string');
		expect(testValue[0] && typeof testValue[0].image).toBe('string');
		expect(testValue[0] && typeof testValue[0].name).toBe('string');
	});
});
