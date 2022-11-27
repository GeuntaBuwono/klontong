import {faker} from '@faker-js/faker';
import {UPDATE_productById} from '@services/UPDATE_productById';
import {appLocalStorage} from '@utils/appLocalStorage';

describe('UPDATE_productById', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});
	const {setItemArray} = appLocalStorage();

	test('should be workly', async () => {
		setItemArray<ProductType>({
			key: 'products',
			value: [
				{
					id: 1,
					CategoryId: faker.datatype.number(),
					categoryName: faker.commerce.product(),
					sku: faker.random.alphaNumeric(5).toUpperCase(),
					name: faker.commerce.productName(),
					description: faker.lorem.paragraphs(),
					weight: 500,
					width: faker.datatype.number(),
					length: faker.datatype.number(),
					height: faker.datatype.number(),
					image: `${faker.image.abstract()}?random=${Date.now()}`,
					harga: Number(faker.commerce.price()),
				},
				{
					id: 2,
					CategoryId: faker.datatype.number(),
					categoryName: faker.commerce.product(),
					sku: faker.random.alphaNumeric(5).toUpperCase(),
					name: faker.commerce.productName(),
					description: faker.lorem.paragraphs(),
					weight: 500,
					width: faker.datatype.number(),
					length: faker.datatype.number(),
					height: faker.datatype.number(),
					image: `${faker.image.abstract()}?random=${Date.now()}`,
					harga: Number(faker.commerce.price()),
				},
			],
		});

		const expectedData = {
			categoryName: 'updated-index-1',
			sku: faker.random.alphaNumeric(5).toUpperCase(),
			name: faker.commerce.productName(),
			description: faker.lorem.paragraphs(),
			weight: 500,
			width: faker.datatype.number(),
			length: faker.datatype.number(),
			height: faker.datatype.number(),
			image: `${faker.image.abstract()}?random=${Date.now()}`,
			harga: Number(faker.commerce.price()),
		};

		const data = await UPDATE_productById({
			targetProductIndex: 1,
			updateProduct: expectedData,
		});

		expect(data[1]).toStrictEqual(expectedData);
	});
});
