import classNames from 'classnames';
import {
	ChangeEventHandler,
	FocusEventHandler,
	HTMLInputTypeAttribute,
} from 'react';

type FormInputProps = {
	id: string;
	label: string;
	value: string | number | undefined;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onBlur: FocusEventHandler<HTMLInputElement>;
	type?: HTMLInputTypeAttribute;
	errorMessage?: string | null;
	placeholder?: string;
};

export default function FormInput({
	id,
	label,
	value,
	onChange,
	onBlur,
	placeholder,
	errorMessage,
	type = 'text',
}: FormInputProps) {
	const labelClassName = classNames(
		'text-gray-700 capitalize',
		errorMessage ? 'text-red-600' : null,
	);

	const inputClassName = classNames(
		'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
		errorMessage ? 'border-red-600' : null,
	);

	return (
		<div className="my-4">
			<label className="block">
				<span className={labelClassName}>{label}</span>
				<input
					id={id}
					name={id}
					type={type}
					className={inputClassName}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
				/>
			</label>
			{errorMessage && (
				<label className="text-red-600 text-sm">{errorMessage}</label>
			)}
		</div>
	);
}
