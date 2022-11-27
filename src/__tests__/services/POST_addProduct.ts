import {POST_addProduct} from '@services/POST_addProduct';
import {appLocalStorage} from '@utils/appLocalStorage';

describe('POST_addProduct', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});

	const TEST_PRODUCT_ARRAY: PostProductType = {
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
	};
	test('should be run correctly', async () => {
		const {setItemArray, getItemArray} = appLocalStorage();

		setItemArray<ProductType>({
			key: 'products',
			value: [],
		});

		const productItem = getItemArray({
			key: 'products',
		});

		expect(productItem).toStrictEqual([]);

		const {data} = await POST_addProduct({
			data: TEST_PRODUCT_ARRAY,
		});

		expect(data.product.id).toBeTruthy();
		expect(data.product.CategoryId).toBeTruthy();

		const productItemAfterUpdate = getItemArray({
			key: 'products',
		});

		expect(productItemAfterUpdate).toHaveLength(1);
	});
});
