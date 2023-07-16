<script setup lang="ts">
const { t } = useI18n()
const isOpenCropper = ref(false)

function handleCloseCropper() {
	isOpenCropper.value = false
}
</script>

<template>
	<div class="min-h-screen w-full flex flex-col items-center justify-center gap-[24px] px-[16px] py-[8px]">
		<div class="flex flex-col items-center justify-center">
			<div class="mb-[16px] rounded-[8px] bg-$color-light-black p-[4px]">
				<div class="i-mi:command h-[48px] w-[48px]" />
			</div>
			<div class="text-center">
				<h1 class="text-xl c-$typography-primary">
					invoice-calc
				</h1>
				<p>#{{ t('helper') }}</p>
			</div>
		</div>

		<div>
			<button @click="isOpenCropper = true">
				<div class="i-mi:icloud-and-arrow-up h-[18px] w-[18px]" />
				<span>{{ t('upload') }} {{ t('photo') }}</span>
			</button>
		</div>
	</div>

	<Teleport to="body">
		<div
			v-if="isOpenCropper"
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
