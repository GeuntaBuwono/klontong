import {faker} from '@faker-js/faker';

const MAX_PRODUCT = 10;

export const productDataBuilder = (): Array<ProductType> => {
	const products: Array<ProductType> = [];

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
			image: `${faker.image.business()}?random=${Date.now()}`,
			harga: Number(faker.commerce.price()),
		};
		products.push(productEntity);
	}

	return products;
};
