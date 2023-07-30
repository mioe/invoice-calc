import { describe, expect, it } from 'vitest'
import { parseInvoiceString } from '../src/helpers'

describe('simple test', () => {
	const TESTS = [
		{
			test: 'item 1 199,99',
			valid: { key: 'item 1', value: '199,99' },
		},
		{
			test: 'item 1 1   99,99',
			valid: { key: 'item 1 1', value: '99,99' },
		},
		{
			test: 'item 1 1   999.99',
			valid: { key: 'item 1 1', value: '999.99' },
		},
		{
			test: 'item1999.99',
			valid: { key: 'item', value: '1999.99' },
		},
		{
			test: 'item 99',
			valid: undefined,
		},
		{
			test: 'item.........1..99.99',
			valid: { key: 'item.........1..', value: '99.99' },
		},
	]

	TESTS.forEach(({ test, valid }) => {
		it(test, () => {
			expect(parseInvoiceString(test)).toEqual(valid)
		})
	})
})
