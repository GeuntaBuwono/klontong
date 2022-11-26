import {appLocalStorage} from '@utils/appLocalStorage';

describe('appLocalStorage', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});

	const {getItemArray, setItemArray} = appLocalStorage();

	test('data should be null', () => {
		const getProductFromLocalStorage = getItemArray({
			key: 'products',
		});
		expect(getProductFromLocalStorage).toBeNull();
	});

	test('data should be exist', () => {
		setItemArray<{name: string}>({
			key: 'products',
			value: [{name: 'testing'}],
		});

		const getProductFromLocalStorage = getItemArray<{name: string}>({
			key: 'products',
		});

		expect(getProductFromLocalStorage).toHaveLength(1);
		expect(getProductFromLocalStorage[0].name).toBe('testing');
	});
});
