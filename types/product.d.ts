type ProductType = {
	CategoryId: number;
	categoryName: string;
	description: string;
	harga: number;
	height: number;
	id: number;
	image: string;
	length: number;
	name: string;
	sku: string;
	weight: number;
	width: number;
};

type OmitKeyForPostProductType = 'id' | 'CategoryId';
type PostProductType = Omit<ProductType, OmitKeyForPostProductType>;
