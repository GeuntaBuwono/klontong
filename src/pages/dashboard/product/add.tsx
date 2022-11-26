import FormInput from '@components/Form/FormInput';
import FormUploadImage from '@components/Form/FormUploadImage';
import DashboardLayout from '@layouts/DashboardLayout';
import classNames from 'classnames';
import {useFormik} from 'formik';
import Image from 'next/image';
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
	sku: yup.string().min(2).max(20).required(),
	name: yup.string().min(2).max(20).required(),
	length: yup.number().min(1).required(),
	image: yup.string().min(2).max(20).required(),
	height: yup.number().min(1).required(),
	harga: yup.number().min(1).required(),
	description: yup.string().min(2).max(20).required(),
});
type AddProduct = yup.InferType<typeof AddProductSchema>;

export default function AddProductPage() {
	const formik = useFormik<AddProduct>({
		initialValues: {
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
		},
		validationSchema: AddProductSchema,
		onSubmit: data => {
			alert(JSON.stringify(data, null, 2));
		},
	});

	const isFormHasError =
		Object.keys(formik.touched).length === 0 ||
		Object.keys(formik.errors).length !== 0;

	const btnSubmitClassName = classNames(
		'bg-blue-400 rounded-sm p-2 w-full text-white',
		isFormHasError ? 'disabled bg-gray-300 cursor-not-allowed' : '',
	);

	return (
		<DashboardLayout pageTitle="Add Product">
			<form onSubmit={formik.handleSubmit} className="w-full max-w-md">
				{formik.values.image ? (
					<>
						<Image
							src={URL.createObjectURL(formik.values.image as unknown as Blob)}
							alt=""
							className="rounded-sm"
							width={500}
							height={500}
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
							formik.setFieldValue('image', imageFilePath);
						}}
						errorMessage={
							formik.errors.image && formik.touched.image
								? formik.errors.image
								: null
						}
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
											formik.errors[key as keyof PostProductType] &&
											formik.touched[key as keyof PostProductType]
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
					Submit
				</button>
			</form>
		</DashboardLayout>
	);
}
