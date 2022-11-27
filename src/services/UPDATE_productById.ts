import {appLocalStorage} from '@utils/appLocalStorage';

export const UPDATE_productById = async ({
	targetProductIndex,
	updateProduct,
}: {
	targetProductIndex: number | undefined;
	updateProduct: PostProductType;
}) => {
	const {getItemArray} = appLocalStorage();
	const productData = getItemArray<PostProductType>({
		key: 'products',
	});

	const updatedProductData = [...productData];

	if (targetProductIndex !== undefined) {
		updatedProductData[targetProductIndex] = updateProduct;
	}

	return updatedProductData;
};
