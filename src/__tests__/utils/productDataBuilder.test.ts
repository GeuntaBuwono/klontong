import {appLocalStorage} from '@utils/appLocalStorage';
import {productDataBuilder} from '@utils/productDataBuilder';

describe('Product Data Builder', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});

	const {getItemArray, setItemArray} = appLocalStorage();

	test('should be have 10 length', () => {
		const testValue = productDataBuilder();
		expect(testValue).toHaveLength(10);
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

	test('has localStorage data', () => {
		const TEST_PRODUCT_ARRAY: Array<ProductType> = [
			{
				id: 1,
				CategoryId: 1,
				categoryName: 'categoryName',
				sku: 'S',
				name: 'name',
				description: 'description',
				weight: 500,
				width: 500,
				length: 500,
				height: 500,
				image: 'image-link',
				harga: 500,
			},
		];

		expect(
			getItemArray<ProductType>({
				key: 'products',
			}),
		).toBeNull();
		expect(
			setItemArray<ProductType>({
				key: 'products',
				value: TEST_PRODUCT_ARRAY,
			}),
		).toBeUndefined();
		expect(
			getItemArray<ProductType>({
				key: 'products',
			}),
		).toStrictEqual(TEST_PRODUCT_ARRAY);

		const testValue = productDataBuilder();
		expect(testValue).toHaveLength(1);
		expect(testValue).toStrictEqual(TEST_PRODUCT_ARRAY);
	});
});
