import {
	LOCAL_STORAGE_PREFIX,
	INVOICE_ITEM_REGEX,
} from '~/constants'

export const setStorageKey = (keyName: string) => `${LOCAL_STORAGE_PREFIX}${keyName}`

export const parseInvoiceString = (str: string) => {
	const matches = str.match(INVOICE_ITEM_REGEX)
	if (matches && matches.length === 3) {
		const key = matches[1].trim()
		const value = matches[2]
		return { key, value }
	}
	return undefined
}
