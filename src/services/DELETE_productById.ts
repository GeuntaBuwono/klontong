import {appLocalStorage} from '@utils/appLocalStorage';

export const DELETE_productById = async ({productId}: {productId: number}) => {
	// TODO: add integration with DELETE product endpoint
	const {getItemArray, setItemArray} = appLocalStorage();
	const productsFromLocalStorage = getItemArray<ProductType>({
		key: 'products',
	});

	const selectedProductByIndex = productsFromLocalStorage.findIndex(
		data => data.id === productId,
	);

	productsFromLocalStorage.splice(selectedProductByIndex, 1);

	setItemArray<ProductType>({
		key: 'products',
		value: productsFromLocalStorage,
	});

	return {
		message: 'success',
		data: {
			productId,
		},
	};
};
