import { v4 as uuidv4 } from 'uuid'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { setStorageKey, parseInvoiceString } from '~/helpers'
import { InvoiceItem } from '~/types'

const invoiceItemsKey = setStorageKey('invoice-items')

export const useAppStore = defineStore('app', () => {
	const invoiceItems = useStorage<InvoiceItem[]>(invoiceItemsKey, [])

	function clearInvoiceItems() {
		invoiceItems.value = []
	}

	function setInvoiceItems(text: string) {
		clearInvoiceItems()

		const strRows = text.split('\n')
		strRows.forEach(row => {
			const item = parseInvoiceString(row)
			if (item) {
				const { key, value } = item
				invoiceItems.value.push({
					id: uuidv4(),
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
