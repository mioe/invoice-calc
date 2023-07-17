<script setup lang="ts">
import Cropper from '~/components/Cropper.vue'

const { t } = useI18n()
const inputFileRef = ref<HTMLInputElement | null>(null)
const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)

function handleUploadPhoto() {
	inputFileRef.value?.click()
}

async function onChange(ev: any) {
	const { target: { files } } = ev
	const file = files[0]
	const result = await cropperRef.value?.open({ file })
	if (result) {
		console.log('🦕 result', result)
	}
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
			<input
				ref="inputFileRef"
				type="file"
				:multiple="false"
				class="hidden"
				@change="onChange"
			>

			<button @click="handleUploadPhoto">
				<div class="i-mi:icloud-and-arrow-up h-[18px] w-[18px]" />
				<span>{{ t('upload') }} {{ t('photo') }}</span>
			</button>
		</div>

		<Cropper ref="cropperRef" />
	</div>
</template>
