import {rgbDataURL} from '@utils/rgbDataURL';

describe('rgbDataURL', () => {
	test('should be valid', () => {
		const testValue = rgbDataURL(243, 243, 243);
		expect(testValue).toBe(
			'data:image/gif;base64,R0lGODlhAQABAPAAAPPz8////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
		);
	});
});
