const exampleTest = ({
	numberA,
	numberB,
}: {
	numberA: number;
	numberB: number;
}) => {
	return numberA + numberB;
};

describe('example test', () => {
	test('testing plus', () => {
		const testValue = exampleTest({
			numberA: 5,
			numberB: 4,
		});
		expect(testValue).toStrictEqual(9);
	});
});

export {};
