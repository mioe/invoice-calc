<script setup lang="ts">
const router = useRouter()
const appStore = useAppStore()

onMounted(() => {
	if (!appStore.bodyText)
		router.replace('/')
})
</script>

<template>
	<div class="grid grid-cols-2 min-h-screen w-full">
		<div class="h-screen overflow-auto">
			<img
				:src="appStore.previewImageBase64"
				alt=""
				class="object-cover"
			>
		</div>
		<div class="h-screen overflow-auto">
			{{ appStore.bodyText }}
		</div>
	</div>
</template>
