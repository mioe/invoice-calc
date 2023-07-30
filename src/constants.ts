export const LOCAL_STORAGE_PREFIX = 'invoice-calc:'

/**
 * INVOICE_ITEM_REGEX -регулярное выражение для извлечения названия и суммы
 * например: 'item1 99.99' | 'item2 2,99' | 'item3 999.09'
 */
export const INVOICE_ITEM_REGEX = /^(.*?)(\d+(?:[.,]\d+)*(?:[.,]\d+))$/
