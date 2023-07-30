import { v4 as uuidv4 } from 'uuid'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { setStorageKey } from '~/constants'
import { InvoiceItem } from '~/types'

const invoiceItemsKey = setStorageKey('invoice-items')

/**
 * регулярное выражение для извлечения названия и суммы
 * например: 'item1 99.99' | 'item2 2,99' | 'item3 999.09'
 */
const INVOICE_ITEM_REGEX = /^(.*?)(\d{1,3}(?:[.,]\d+)*(?:[.,]\d+))$/

export const useAppStore = defineStore('app', () => {
	const invoiceItems = useStorage<InvoiceItem[]>(invoiceItemsKey, [])

	function clearInvoiceItems() {
		invoiceItems.value = []
	}

	function setInvoiceItems(text: string) {
		clearInvoiceItems()

		const strRows = text.split('\n')
		strRows.forEach(row => {
			const matches = row.match(INVOICE_ITEM_REGEX)
			if (matches && matches.length === 3) {
				const id = uuidv4()
				const key = matches[1].trim()
				const value = matches[2]

				invoiceItems.value.push({
					id,
					key,
					value,
				})
			}
		})
	}

	return {
		invoiceItems,
		clearInvoiceItems,
		setInvoiceItems,
	}
})

/**
 * HMR (Hot Module Replacement)
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
