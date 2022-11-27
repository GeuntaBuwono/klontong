import {DELETE_productById} from '@services/DELETE_productById';
import {appLocalStorage} from '@utils/appLocalStorage';

type TestDeleteType = {id: number; name: string};

describe('DETELE_productById', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.clearAllMocks();
	});
	const {setItemArray} = appLocalStorage();

	test('should be workly', async () => {
		setItemArray<TestDeleteType>({
			key: 'products',
			value: [
				{
					id: 1,
					name: 'testingName-1',
				},
				{
					id: 2,
					name: 'testingName-2',
				},
			],
		});

		const {data} = await DELETE_productById({
			productId: 2,
		});

		expect(data).toStrictEqual({
			productId: 2,
		});
	});
});
