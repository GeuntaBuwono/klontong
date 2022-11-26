import DashboardLayout from '@layouts/DashboardLayout';
import {productDataBuilder} from '@utils/productDataBuilder';
import {rgbDataURL} from '@utils/rgbDataURL';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {useQuery} from 'react-query';

const ProductCardSkeleton = () => (
	<div className="border border-blue-300 shadow rounded-md max-w-sm w-full mx-auto">
		<div className="animate-pulse flex flex-col">
			<div className="flex flex-1 items-center justify-center">
				<div className="bg-slate-700 h-60 w-full"></div>
			</div>
			<div className="flex-1 space-y-6 p-4">
				<div className="space-y-1">
					<div className="h-2 bg-slate-700 rounded col-span-2"></div>
					<div className="h-2 bg-slate-700 rounded col-span-1"></div>
				</div>

				<div className="space-y-1">
					<div className="h-2 bg-slate-700 rounded col-span-2"></div>
					<div className="h-2 bg-slate-700 rounded col-span-1"></div>
					<div className="h-2 bg-slate-700 rounded col-span-2"></div>
					<div className="h-2 bg-slate-700 rounded col-span-1"></div>
				</div>

				<div className="h-2 bg-slate-700 rounded"></div>
			</div>
		</div>
	</div>
);

const ProductCard = ({
	id,
	image,
	description,
	categoryName,
	width,
	weight,
	sku,
	name,
	length,
	height,
	harga,
	CategoryId,
}: ProductType) => {
	const borderClassName = classNames('border-2 p-2 my-2');

	return (
		<Link
			href={{
				pathname: '/dashboard/product/[id]',
				query: {id: String(id)},
			}}
			className="bg-slate-100 text-white rounded-xl dark:bg-slate-800 md:max-w-md"
		>
			<Image
				src={image}
				alt={description}
				blurDataURL={rgbDataURL(243, 243, 243)}
				width="512"
				height="250"
				placeholder="blur"
				style={{
					height: 'auto',
					maxHeight: '200px',
				}}
			/>
			<div className="px-6 py-4">
				<div className="mb-2">
					<p className="text-2xl font-semibold text-center line-clamp-1">
						{name}
					</p>
					<p className="line-clamp-3">{description}</p>
				</div>

				<div className={borderClassName}>
					<p>Category ID: {CategoryId}</p>
					<p>Category Name: {categoryName}</p>
					<p>SKU: {sku}</p>
				</div>

				<div className={borderClassName}>
					<h4 className="text-center border-b-2 mb-2 pb-2 font-semibold">
						Product Detail
					</h4>
					<p>Height: {height}</p>
					<p>Width: {width}</p>
					<p>Weight: {weight}</p>
					<p>Length: {length}</p>
				</div>
			</div>
			<div className="px-6 py-4 flex justify-between text-lg font-semibold">
				<span>Harga</span>
				<p>Rp.{harga}</p>
			</div>
		</Link>
	);
};

type PaginationProps = {
	activePage: number;
	isHasNextPage: boolean;
	onClickPrev: () => void;
	onClickNext: () => void;
};

const Pagination = ({
	activePage,
	isHasNextPage,
	onClickPrev,
	onClickNext,
}: PaginationProps) => {
	const pageItemClassName = classNames('page-item', activePage ? 'active' : '');

	return (
		<div className="flex justify-center">
			<nav aria-label="Page navigation example">
				<ul className="flex list-style-none">
					{activePage > 1 && (
						<>
							<li className="page-item">
								<a
									onClick={onClickPrev}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
									href="#"
								>
									Prev
								</a>
							</li>
							<li className={pageItemClassName}>
								<a
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
									href="#"
								>
									{activePage - 1}
								</a>
							</li>
						</>
					)}
					<li className={pageItemClassName}>
						<a
							className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
							href="#"
						>
							{activePage} <span className="visually-hidden"></span>
						</a>
					</li>
					{isHasNextPage && (
						<>
							<li className={pageItemClassName}>
								<a
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
									href="#"
								>
									{activePage + 1}
								</a>
							</li>
							<li className="page-item">
								<a
									onClick={onClickNext}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
									href="#"
								>
									Next
								</a>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};

const NoDataFound = () => <h4>No Product found you</h4>;

export default function ProductPage() {
	const [activePage, setActivePage] = useState(1);
	const {data: products, isLoading: isLoadingProduct} = useQuery(
		['products', activePage],
		productDataBuilder,
		{
			onSuccess: data => {
				localStorage.setItem('products', JSON.stringify(data));
			},
		},
	);

	return (
		<DashboardLayout pageTitle="Product">
			<div className="flex pb-4 text-center">
				<Link
					href="/dashboard/product/add"
					className="border-blue-400 border-2 p-2 text-2xl"
				>
					<h3>Add Product</h3>
				</Link>
			</div>

			{isLoadingProduct && (
				<div className="w-full pt-2 flex flex-col gap-4 md:grid md:grid-cols-3">
					{Array.from({length: 9}).map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}
				</div>
			)}

			{!isLoadingProduct && products && products?.length === 0 ? (
				<NoDataFound />
			) : (
				<>
					<div className="flex flex-col gap-4 md:grid md:grid-cols-3">
						{products?.map(product => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>
					<Pagination
						activePage={activePage}
						isHasNextPage={activePage !== 10}
						onClickPrev={() => setActivePage(prev => prev - 1)}
						onClickNext={() => setActivePage(prev => prev + 1)}
					/>
				</>
			)}
		</DashboardLayout>
	);
}
