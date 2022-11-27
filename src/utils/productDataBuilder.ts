import {faker} from '@faker-js/faker';
import {appLocalStorage} from './appLocalStorage';

const MAX_PRODUCT = 100;

export const productDataBuilder = (): Array<ProductType> => {
	const {getItemArray, setItemArray} = appLocalStorage();

	const localStorageProducts = getItemArray<ProductType>({
		key: 'products',
	});

	const products: Array<ProductType> = localStorageProducts
		? localStorageProducts
		: [];

	if (!localStorageProducts) {
		for (let index = 0; index < MAX_PRODUCT; index++) {
			const productEntity: ProductType = {
				id: faker.datatype.number(),
				CategoryId: faker.datatype.number(),
				categoryName: faker.commerce.product(),
				sku: faker.random.alphaNumeric().toUpperCase(),
				name: faker.commerce.productName(),
				description: faker.lorem.paragraphs(),
				weight: 500,
				width: faker.datatype.number(),
				length: faker.datatype.number(),
				height: faker.datatype.number(),
				image: `${faker.image.abstract()}?random=${Date.now()}`,
				harga: Number(faker.commerce.price()),
			};
			products.push(productEntity);
		}
		setItemArray({
			key: 'products',
			value: products,
		});
	}

	return products;
};
