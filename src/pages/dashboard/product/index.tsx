import FormInput from '@components/Form/FormInput';
import DashboardLayout from '@layouts/DashboardLayout';
import {queryClient} from '@pages/_app';
import {DELETE_productById} from '@services/DELETE_productById';
import {GET_products, GET_ProductsResponse} from '@services/GET_products';
import {rgbDataURL} from '@utils/rgbDataURL';
import classNames from 'classnames';
import {useFormik} from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import * as yup from 'yup';
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

type ProductCardProps = {
	onClickDelete: () => void;
} & Omit<
	ProductType,
	| 'categoryName'
	| 'width'
	| 'weight'
	| 'sku'
	| 'length'
	| 'height'
	| 'CategoryId'
>;

const ProductCard = ({
	id,
	image,
	description,
	name,
	harga,
	onClickDelete,
}: ProductCardProps) => (
	<div className="bg-slate-100 text-white rounded-xl dark:bg-slate-800 md:max-w-md">
		<Link
			href={{
				pathname: '/dashboard/product/[id]',
				query: {id: String(id)},
			}}
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
					<p className="text-2xl font-semibold text-center line-clamp-1 capitalize">
						{name}
					</p>
					<p className="line-clamp-3">{description}</p>
				</div>
			</div>
			<div className="px-6 py-4 flex justify-between text-lg font-semibold">
				<span>Harga</span>
				<p>Rp.{harga}</p>
			</div>
		</Link>
		<div className="flex flex-1 justify-center">
			<button
				className="w-full py-2 bg-red-700 text-white rounded-b-sm"
				onClick={onClickDelete}
			>
				<span>Remove Product</span>
			</button>
		</div>
	</div>
);

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
								<button
									onClick={onClickPrev}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								>
									Prev
								</button>
							</li>
							<li className={pageItemClassName}>
								<button
									onClick={onClickPrev}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								>
									{activePage - 1}
								</button>
							</li>
						</>
					)}
					<li className={pageItemClassName}>
						<button className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md">
							{activePage} <span className="visually-hidden"></span>
						</button>
					</li>
					{isHasNextPage && (
						<>
							<li className={pageItemClassName}>
								<button
									onClick={onClickNext}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								>
									{activePage + 1}
								</button>
							</li>
							<li className="page-item">
								<button
									onClick={onClickNext}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								>
									Next
								</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};

const NoDataFound = () => <h4>No Product Found</h4>;

const SearchProductSchema = yup.object({
	productName: yup.string().min(3).max(20),
});
type SearchProduct = yup.InferType<typeof SearchProductSchema>;

export default function ProductPage() {
	const [activePage, setActivePage] = useState(1);

	const formik = useFormik<SearchProduct>({
		initialValues: {
			productName: '',
		},
		validationSchema: SearchProductSchema,
		onSubmit: values => {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			refetchProducts({
				queryKey: ['products', activePage, values.productName],
			});
		},
	});

	const {
		data: products,
		isLoading: isLoadingProduct,
		refetch: refetchProducts,
	} = useQuery(
		['products', activePage, formik.values.productName],
		({queryKey}) => {
			return GET_products({
				page_size: 12,
				page_number: Number(queryKey[1]),
				searchProductQuery: String(queryKey[2]),
			});
		},
		{
			keepPreviousData: true,
			enabled: !formik.values.productName,
		},
	);

	const {
		mutateAsync: mutationAsyncDeleteProduct,
		isLoading: isLoadingDeleteProduct,
	} = useMutation(['deleteProduct'], DELETE_productById, {
		onSuccess: () => {
			queryClient.invalidateQueries(['products', activePage]);
			const productDataFromCache: GET_ProductsResponse | undefined =
				queryClient.getQueryData(['products', activePage]);

			const isEmptyActivePage = productDataFromCache?.data.length === 1;

			const isShouldNavigateToPreviousPage =
				isEmptyActivePage && activePage !== 1;

			if (isShouldNavigateToPreviousPage) {
				setActivePage(prev => prev - 1);
			}
		},
	});

	const isLoadingPage = isLoadingProduct || isLoadingDeleteProduct;

	return (
		<DashboardLayout pageTitle="Product">
			<div className="flex pb-4 text-center flex-col w-full max-w-md">
				<Link
					href="/dashboard/product/add"
					className="border-blue-400 border-2 p-2 text-2xl"
				>
					<h3>Add Product</h3>
				</Link>
				<form onSubmit={formik.handleSubmit} className="w-full max-w-md">
					<FormInput
						id="productName"
						label="Search Product"
						placeholder={`Search Product by Name`}
						value={formik.values.productName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						errorMessage={
							formik.errors.productName && formik.touched.productName
								? formik.errors.productName
								: null
						}
					/>
				</form>
			</div>

			{isLoadingPage && (
				<div className="w-full pt-2 flex flex-col gap-4 md:grid md:grid-cols-3">
					{Array.from({length: 9}).map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}
				</div>
			)}

			{!isLoadingPage && products && products?.total === 0 ? (
				<NoDataFound />
			) : (
				<>
					<div className="flex flex-col gap-4 md:grid md:grid-cols-3 pb-4">
						{products?.data?.map(product => (
							<ProductCard
								key={product.id}
								onClickDelete={() => {
									mutationAsyncDeleteProduct({
										productId: product.id,
									});
								}}
								{...product}
							/>
						))}
					</div>
					<Pagination
						activePage={activePage}
						isHasNextPage={!!products?.isHasMore}
						onClickPrev={() => setActivePage(prev => prev - 1)}
						onClickNext={() => setActivePage(prev => prev + 1)}
					/>
				</>
			)}
		</DashboardLayout>
	);
}
