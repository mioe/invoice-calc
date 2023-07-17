<script setup lang="ts">
// const props = defineProps<{}>()

const isOpen = ref(false)

function handleOpenCropper() {
	isOpen.value = true
}

function handleCloseCropper() {
	isOpen.value = false
}

defineExpose({
	handleOpenCropper,
})
</script>

<template>
	<Teleport to="body">
		<div
			v-if="isOpen"
			class="fixed bottom-0 top-0 h-screen w-full flex flex-col overscroll-auto bg-$color-dark-black"
		>
			<header class="w-full flex items-center bg-$color-light-black px-[16px] py-[8px]">
				<button
					class="p-0"
					@click="handleCloseCropper"
				>
					<div class="i-mi:chevron-left h-[24px] w-[24px]" />
				</button>
			</header>
			<div>
				dd
			</div>
		</div>
	</Teleport>
</template>
