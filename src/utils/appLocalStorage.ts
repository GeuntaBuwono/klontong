type AppLocalStoragePropsGetItem = {
	key: 'products';
};

type AppLocalStoragePropsSetItem<DataType> = {
	value: Array<DataType>;
} & AppLocalStoragePropsGetItem;

export const appLocalStorage = () => {
	function setItemArray<DataType>({
		key,
		value,
	}: AppLocalStoragePropsSetItem<DataType>) {
		return localStorage.setItem(key, JSON.stringify(value));
	}

	function getItemArray<DataType>({
		key,
	}: AppLocalStoragePropsGetItem): Array<DataType> {
		return JSON.parse(localStorage.getItem(key) as string);
	}

	return {
		setItemArray,
		getItemArray,
	};
};
