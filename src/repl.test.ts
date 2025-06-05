import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
	{
		input: " hello world ",
		expected: ["hello", "world"],
		// TODO: more test cases here
	},
])("celanInput(${input)", ({ input, expected }) => {
	test(`Expected: ${expected}`, () => {
		// TODO call cleanInput with input here
		// The `expect` and `toHaveLength` functions are from vitest
		// they will fail the test if the condition is not met
		const actual = cleanInput(input);
		expect(actual).toHaveLength(expected.length);
		for (const i in expected) {
			expect(actual[i]).toBe(expected[i]);
		}
	});
});
