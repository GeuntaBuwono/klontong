import DashboardLayout from '@layouts/DashboardLayout';
import {rgbDataURL} from '@utils/rgbDataURL';
import classNames from 'classnames';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';

export default function ProductDetailPage() {
	const router = useRouter();

	const borderClassName = classNames('border-2 p-2 my-2');

	const {data: dataDetailProduct} = useQuery(
		['detailProduct', router.query.id],
		({queryKey}) => {
			const localStorageProducts = localStorage.getItem('products');
			const localStorageProductsJSON: Array<ProductType> =
				localStorageProducts && JSON.parse(localStorageProducts);

			return localStorageProductsJSON.find(
				value => value.id === Number(queryKey[1]),
			);
		},
	);

	if (dataDetailProduct) {
		return (
			<DashboardLayout
				pageTitle={dataDetailProduct?.name ?? ''}
				isCenterContent
			>
				<Image
					className="py-4"
					src={dataDetailProduct?.image}
					alt={dataDetailProduct?.description}
					blurDataURL={rgbDataURL(243, 243, 243)}
					width="512"
					height="512"
					placeholder="blur"
					style={{
						width: '100%',
						height: '512px',
						objectFit: 'contain',
					}}
				/>
				<p>{dataDetailProduct?.description}</p>
				<div className="flex flex-1 flex-col w-full">
					<div className={borderClassName}>
						<p>Category ID: {dataDetailProduct?.CategoryId}</p>
						<p>Category Name: {dataDetailProduct?.categoryName}</p>
						<p>SKU: {dataDetailProduct?.sku}</p>
					</div>
					<div className={borderClassName}>
						<h4 className="text-center border-b-2 mb-2 pb-2 font-semibold">
							Product Detail
						</h4>
						<p>Height: {dataDetailProduct?.height}</p>
						<p>Width: {dataDetailProduct?.width}</p>
						<p>Weight: {dataDetailProduct?.weight}</p>
						<p>Length: {dataDetailProduct?.length}</p>
					</div>
					<div className="px-6 py-4 flex justify-between text-lg font-semibold bg-green-300 text-gray-800">
						<span>Harga</span>
						<p>Rp. {dataDetailProduct?.harga}</p>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	return null;
}
