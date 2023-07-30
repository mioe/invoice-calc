<script setup lang="ts">
import InvoiceItem from '~/components/InvoiceItem.vue'

const router = useRouter()
const appStore = useAppStore()

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
</template>
