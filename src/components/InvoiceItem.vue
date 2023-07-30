<script setup lang="ts">
import { InvoiceItem } from '~/types'
const props = defineProps<{
	item: InvoiceItem
}>()
</script>

<template>
	<div
		:id="item.id"
		class="flex justify-between bg-yellow-900"
	>
		<div>
			{{ item.key }}
		</div>
		<div>
			{{ item.value }}
		</div>
	</div>
</template>
