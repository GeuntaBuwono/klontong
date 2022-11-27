type PaginateArrayProps<DataType> = {
	data: Array<DataType>;
	page_size: number;
	page_number: number;
};

export function paginateArray<DataType>({
	data,
	page_size,
	page_number,
}: PaginateArrayProps<DataType>): {
	data: Array<DataType>;
	isHasMore: boolean;
} {
	if (page_number === 0) {
		throw new Error('page number must be more than 0');
	}

	return {
		data: data.slice((page_number - 1) * page_size, page_number * page_size),
		isHasMore: page_number * page_size <= data.length,
	};
}
