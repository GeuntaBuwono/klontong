import {appLocalStorage} from '@utils/appLocalStorage';
import {paginateArray} from '@utils/paginateArray';
import {productDataBuilder} from '@utils/productDataBuilder';

type PageSizeType = 12;

type GET_ProductsProps = {
	page_size: PageSizeType;
	page_number: number;
};

export type GET_ProductsResponse = {
	data: Array<ProductType>;
	total: number;
	isHasMore: boolean;
};

export const GET_products = ({
	page_number,
	page_size,
}: GET_ProductsProps): GET_ProductsResponse => {
	// TODO: add integration with GET product endpoint
	productDataBuilder();

	const {getItemArray} = appLocalStorage();
	const data = getItemArray<ProductType>({
		key: 'products',
	});

	const {data: dataPaginate, isHasMore} = paginateArray<ProductType>({
		data,
		page_size,
		page_number,
	});

	return {
		data: dataPaginate,
		total: data.length,
		isHasMore,
	};
};
