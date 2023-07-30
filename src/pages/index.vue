<script setup lang="ts">
import Tesseract from 'tesseract.js'
import Cropper from '~/components/Cropper.vue'
import Loader from '~/components/Loader.vue'

const { t } = useI18n()
const appStore = useAppStore()
const { setInvoiceItems } = appStore
const router = useRouter()
const inputFileRef = shallowRef<HTMLInputElement | null>(null)
const cropperRef = shallowRef<InstanceType<typeof Cropper> | null>(null)
const isLoading = ref(false)
const recognizeProgress = ref(0)

function handleUploadPhoto() {
	inputFileRef.value?.click()
}

async function onChange(ev: any) {
	const { target: { files } } = ev
	const file = files[0]
	try {
		const preview = await cropperRef.value?.open({ file }) as File
		isLoading.value = true
		recognizeProgress.value = 0
		Tesseract.recognize(
			preview,
			'rus+eng',
			{ logger: m => {
				recognizeProgress.value = m.progress
			} },
		).then(({ data: { text } }) => {
			setInvoiceItems(text)
			router.push({ name: 'edit' })
		})
	} catch (err) {
		console.error(err)
		isLoading.value = false
		recognizeProgress.value = 0
	}
}
</script>

<template>
	<div class="relative min-h-screen w-full flex flex-col items-center justify-center gap-[24px] px-[16px] py-[8px]">
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
		<Loader
			:is-loading="isLoading"
			:progress="recognizeProgress"
		/>
	</div>
</template>
