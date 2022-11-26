import {ChangeEventHandler, FocusEventHandler} from 'react';

type FormUploadImageProps = {
	id: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onBlur: FocusEventHandler<HTMLInputElement>;
	placeholder?: string;
	errorMessage?: string | null;
};

export default function FormUploadImage({
	id,
	onBlur,
	onChange,
	errorMessage,
	placeholder = 'Select a image of product',
}: FormUploadImageProps) {
	return (
		<>
			<div className="flex items-center justify-center w-full">
				<label
					className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
					htmlFor={id}
				>
					<div className="flex flex-col items-center justify-center pt-7">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
							{placeholder}
						</p>
					</div>
					<input
						accept=".jpg, .jpeg"
						type="file"
						id={id}
						name={id}
						className="opacity-0"
						onBlur={onBlur}
						onChange={onChange}
					/>
				</label>
			</div>
			{errorMessage && (
				<label className="text-red-600 text-sm">{errorMessage}</label>
			)}
		</>
	);
}
