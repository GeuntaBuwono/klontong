import FormInput from '@components/Form/FormInput';
import FormUploadImage from '@components/Form/FormUploadImage';
import DashboardLayout from '@layouts/DashboardLayout';
import {POST_addProduct} from '@services/POST_addProduct';
import {UPDATE_productById} from '@services/UPDATE_productById';
import {appLocalStorage} from '@utils/appLocalStorage';
import {rgbDataURL} from '@utils/rgbDataURL';
import classNames from 'classnames';
import {useFormik} from 'formik';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useMutation, useQuery} from 'react-query';
import * as yup from 'yup';

const labelFormatterFormInput = ({value}: {value: string}) => {
	if (value === 'categoryName') {
		return 'Category Name';
	}

	if (value === 'sku') {
		return 'SKU';
	}

	return value;
};

const AddProductSchema = yup.object({
	categoryName: yup.string().min(2).max(20).required(),
	width: yup.number().min(1).required(),
	weight: yup.number().min(1).required(),
	sku: yup.string().min(5).max(5).required(),
	name: yup.string().min(2).max(100).required(),
	length: yup.number().min(1).required(),
	image: yup.string().required(),
	height: yup.number().min(1).required(),
	harga: yup.number().min(1).required(),
	description: yup.string().min(2).required(),
});
type AddProduct = yup.InferType<typeof AddProductSchema>;

const INITIAL_VALUE_ADD_PRODUCT = {
	categoryName: '',
	description: '',
	harga: 0,
	height: 0,
	image: '',
	length: 0,
	name: '',
	sku: '',
	weight: 0,
	width: 0,
};

export default function AddProductPage() {
	const {getItemArray, setItemArray} = appLocalStorage();
	const router = useRouter();
	const isEditing = !!router.query.editing;

	const {data: dataEditing} = useQuery(
		['editProduct', router.query.editing],
		() => {
			const productsFromLocalStorage = getItemArray<ProductType>({
				key: 'products',
			});

			const index = productsFromLocalStorage.findIndex(
				data => data.id === Number(router.query.editing),
			);

			const product = productsFromLocalStorage.find(
				data => data.id === Number(router.query.editing),
			);

			return {
				index,
				product: product,
			};
		},
	);

	const {mutateAsync: mutationAsyncAddProduct, isLoading: isLoadingAddProduct} =
		useMutation('addProduct', POST_addProduct, {
			onSuccess: () => {
				router.replace('/dashboard/product');
			},
		});

	const {
		mutateAsync: mutationAsyncEditProduct,
		isLoading: isLoadingEditProduct,
	} = useMutation('editProduct', UPDATE_productById, {
		onSuccess: data => {
			setItemArray<PostProductType>({
				key: 'products',
				value: data,
			});
			router.replace('/dashboard/product');
		},
	});

	const formik = useFormik<AddProduct>({
		initialValues: dataEditing?.product ?? INITIAL_VALUE_ADD_PRODUCT,
		enableReinitialize: true,
		validationSchema: AddProductSchema,
		onSubmit: data => {
			isEditing
				? mutationAsyncEditProduct({
						targetProductIndex: dataEditing?.index,
						updateProduct: data,
				  })
				: mutationAsyncAddProduct({
						data,
				  });
		},
	});

	const isFormHasError =
		(!isEditing && Object.keys(formik.touched).length === 0) ||
		Object.keys(formik.errors).length !== 0;

	const btnSubmitClassName = classNames(
		'bg-blue-400 rounded-sm p-2 w-full text-white',
		isFormHasError ? 'disabled bg-gray-300 cursor-not-allowed' : '',
	);

	return (
		<DashboardLayout pageTitle={`${isEditing ? 'Edit' : 'Add'} Product`}>
			<form
				onSubmit={isFormHasError ? undefined : formik.handleSubmit}
				className="w-full max-w-md"
			>
				{formik.values.image ? (
					<>
						<Image
							src={formik.values.image}
							alt="product-image"
							className="rounded-sm"
							width={500}
							height={500}
							placeholder="blur"
							blurDataURL={rgbDataURL(243, 243, 243)}
							style={{
								width: '100%',
								height: 'auto',
								maxHeight: '500px',
							}}
						/>
						<div className="flex flex-1">
							<button
								className="w-full py-2 bg-red-400 text-white rounded-b-sm"
								onClick={() => formik.setFieldValue('image', '')}
							>
								<span>Remove Image</span>
							</button>
						</div>
					</>
				) : (
					<FormUploadImage
						id="image"
						onBlur={formik.handleBlur}
						onChange={event => {
							const imageFilePath = event.target.files && event.target.files[0];
							formik.setFieldValue(
								'image',
								URL.createObjectURL(imageFilePath as unknown as Blob),
							);
						}}
						errorMessage={formik.errors.image ? formik.errors.image : null}
					/>
				)}

				{Object.keys(formik.values)
					.sort()
					.map(key => {
						if (key !== 'image') {
							return (
								<div key={key}>
									<FormInput
										id={key}
										label={labelFormatterFormInput({value: key})}
										placeholder={`Please input your ${labelFormatterFormInput({
											value: key,
										})}`}
										value={formik.values[key as keyof PostProductType]}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errorMessage={
											formik.errors[key as keyof PostProductType]
												? formik.errors[key as keyof PostProductType]
												: null
										}
									/>
								</div>
							);
						}
						return null;
					})}

				<button
					type="submit"
					className={btnSubmitClassName}
					disabled={isFormHasError}
				>
					{isLoadingAddProduct || isLoadingEditProduct ? (
						<div className="flex items-center justify-center">
							<div className="w-6 h-6 border-b-2 border-blue-500 rounded-full animate-spin"></div>
							<span className="ml-4">Loading...</span>
						</div>
					) : (
						<span>Submit</span>
					)}
				</button>
			</form>
		</DashboardLayout>
	);
}
