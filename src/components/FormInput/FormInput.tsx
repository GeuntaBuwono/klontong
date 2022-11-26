import {ChangeEventHandler, FocusEventHandler} from 'react';

type FormInputProps = {
	id: string;
	label: string;
	value: string | number | undefined;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onBlur: FocusEventHandler<HTMLInputElement>;
	placeholder?: string;
};

export default function FormInput({
	id,
	label,
	value,
	onChange,
	onBlur,
	placeholder,
}: FormInputProps) {
	return (
		<label className="block my-4">
			<span className="text-gray-700 capitalize">{label}</span>
			<input
				id={id}
				name={id}
				type="text"
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</label>
	);
}
