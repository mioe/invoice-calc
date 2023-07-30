<script setup lang="ts">
import InvoiceItem from '~/components/InvoiceItem.vue'

const { t } = useI18n()
const router = useRouter()
const appStore = useAppStore()
const { clearInvoiceItems } = appStore

const handleClear = () => {
	clearInvoiceItems()
	router.replace('/')
}

onMounted(() => {
	if (!appStore.invoiceItems.length)
		router.replace('/')
})
</script>

<template>
	<div class="min-h-screen w-full p-[8px]">
		<InvoiceItem
			v-for="i in appStore.invoiceItems"
			:key="i.key"
			:item="i"
		/>
	</div>

	<button
		class="fixed bottom-[24px] left-[16px]"
		@click="handleClear"
	>
		<div class="i-mi:square-and-pencil h-[18px] w-[18px]" />
		<span>{{ t('clear') }}</span>
	</button>
</template>
