<script setup lang="ts">
const router = useRouter()
const appStore = useAppStore()

onMounted(() => {
	if (!appStore.invoiceItems.length)
		router.replace('/')
})
</script>

<template>
	<div class="min-h-screen w-full p-[8px]">
		<div
			v-for="i in appStore.invoiceItems"
			:key="i.key"
		>
			{{ i.key }}
			{{ i.value }}
		</div>
	</div>
</template>
