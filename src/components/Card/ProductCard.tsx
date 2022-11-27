import {rgbDataURL} from '@utils/rgbDataURL';
import Image from 'next/image';
import Link from 'next/link';

export const ProductCardSkeleton = () => (
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
	onClickEdit: () => void;
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

export const ProductCard = ({
	id,
	image,
	description,
	name,
	harga,
	onClickEdit,
	onClickDelete,
}: ProductCardProps) => (
	<div className="bg-slate-100 text-white rounded-xl dark:bg-slate-800 md:max-w-md">
		<Link
			href={{
				pathname: '/dashboard/product/[id]',
				query: {id: String(id)},
			}}
		>
			{typeof image === 'string' && (
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
			)}
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
				className="w-full py-2 bg-blue-600 text-white rounded-b-sm"
				onClick={onClickEdit}
			>
				<span>Edit</span>
			</button>
			<button
				className="w-full py-2 bg-red-600 text-white rounded-b-sm"
				onClick={onClickDelete}
			>
				<span>Remove</span>
			</button>
		</div>
	</div>
);
