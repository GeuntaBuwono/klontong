import {faker} from '@faker-js/faker';

const MAX_PRODUCT = 100;

export const productDataBuilder = () => {
	const products: Array<ProductType> = [];

	for (let index = 0; index < MAX_PRODUCT; index++) {
		const productEntity: ProductType = {
			id: faker.datatype.number(),
			CategoryId: faker.datatype.number(),
			categoryName: faker.commerce.product(),
			sku: faker.random.alphaNumeric().toUpperCase(),
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			weight: 500,
			width: faker.datatype.number(),
			length: faker.datatype.number(),
			height: faker.datatype.number(),
			image: 'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
			harga: Number(faker.commerce.price()),
		};
		products.push(productEntity);
	}

	return products;
};
