<style lang="scss" scoped>
@import "../skeleton.scss";
</style>
<template>
	<Skeleton row="6" animated round :loading="loading" height="20px" width="300px"></Skeleton>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import Skeleton from './skeleton.vue'
export default {
	props: {},
	emits: [],
	components: { Skeleton },
	setup(props) {
		const loading = ref(false)
		onMounted(() => {
			// setTimeout(() => {
			// 	loading.value = false
			// }, 3000)
		})
		return {
			loading
		}
	}
}
</script>
