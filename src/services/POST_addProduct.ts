import {faker} from '@faker-js/faker';
import {appLocalStorage} from '@utils/appLocalStorage';

export const POST_addProduct = async ({data}: {data: PostProductType}) => {
	const {getItemArray, setItemArray} = appLocalStorage();

	const products = getItemArray<ProductType>({
		key: 'products',
	});

	const uploadData: ProductType = {
		id: faker.datatype.number(),
		CategoryId: faker.datatype.number(),
		...data,
	};

	products.push(uploadData);

	setItemArray<ProductType>({
		key: 'products',
		value: products,
	});

	return {
		message: 'success',
		data: {
			product: uploadData,
		},
	};
};
