import { ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
	const previewImageBase64 = ref<string | undefined>()
	const bodyText = ref<string | null>(null)

	function setPreview(file: File) {
		previewImageBase64.value = URL.createObjectURL(file)
	}

	function setBodyText(text: string) {
		bodyText.value = text
	}

	return {
		previewImageBase64,
		bodyText,
		setPreview,
		setBodyText,
	}
})

/**
 * HMR (Hot Module Replacement)
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
