<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import Loader from '~/components/Loader.vue'

const { t } = useI18n()

const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)

const isOpen = ref(false)
const isLoaded = ref(false)
const resolveCallback = ref<any>(null)
const rejectCallback = ref<any>(null)
const base64File = ref<string | null>(null)

function reset() {
	isOpen.value = false
	isLoaded.value = false
	resolveCallback.value = null
	rejectCallback.value = null

	if (base64File.value)
		URL.revokeObjectURL(base64File.value)
}

function open({ file }: { file: File }) {
	const promise = new Promise((resolve, reject) => {
		resolveCallback.value = resolve
		rejectCallback.value = reject
	})

	isOpen.value = true
	base64File.value = URL.createObjectURL(file)

	return promise
}

function close() {
	rejectCallback.value()
	reset()
}

function submit() {
	const { canvas } = cropperRef.value?.getResult() as any

	canvas.toBlob((blob: any) => {
		const file = new File([blob], Date.now() + '.png', {
			type: 'image/png',
		})
		resolveCallback.value(file)
		reset()
	}, 'image/png', 1)
}

const onReady = () => {
	isLoaded.value = true
}

const handleSubmit = () => {
	submit()
}

const handleClose = () => {
	close()
}

defineExpose({
	open,
})
</script>

<template>
	<Teleport to="body">
		<div
			v-if="isOpen"
			class="fixed bottom-0 top-0 h-screen w-full flex flex-col bg-$color-dark-black"
		>
			<header class="w-full flex shrink-0 items-center bg-$color-light-black px-[16px] py-[8px]">
				<button
					class="p-0"
					@click="handleClose"
				>
					<div class="i-mi:chevron-left h-[24px] w-[24px]" />
				</button>
			</header>
			<div class="relative h-full flex items-center justify-center">
				<Cropper
					ref="cropperRef"
					:src="base64File"
					@ready="onReady"
				/>
				<button
					v-if="isLoaded"
					class="fixed bottom-[24px] right-[16px] z-1"
					@click="handleSubmit"
				>
					<div class="i-mi:crop h-[18px] w-[18px]" />
					<span>{{ t('crop') }}</span>
				</button>

				<Loader :is-loading="!isLoaded" />
			</div>
		</div>
	</Teleport>
</template>
