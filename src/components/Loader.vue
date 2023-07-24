<script setup lang="ts">
const props = defineProps<{
	isLoading: boolean
	progress?: number
}>()

const getProgress = computed(() => props.progress?.toFixed(2))
</script>

<template>
	<div
		v-if="isLoading"
		class="absolute inset-0 z-1 flex items-center justify-center bg-$color-dark-black c-$typography-interactive"
	>
		<div class="flex flex-col items-center justify-center gap-[4px] rounded-[8px] bg-$color-light-black p-[12px]">
			<div class="i-mi:svg-spinners-ring-resize h-[32px] w-[32px]" />
			<span v-if="progress !== undefined">
				{{ getProgress }}%
			</span>
		</div>
	</div>
</template>
