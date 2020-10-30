<template>
	<div id="app" class="container mt-5 w-50">
		<app-form-schedule />
	</div>
</template>

<script>
	import appFormSchedule from './components/appFormSchedule.vue'

	export default {
		data() {
			return {
				departSelected: '',
				arrivalSelected: '',
				timeSelected: ''
			}
		},
		// methods: {
		// 	searchSchedule(departSelected, arrivalSelected, timeSelected) {
		// 		this.departSelected = departSelected,
		// 		this.arrivalSelected = arrivalSelected,
		// 		this.timeSelected = timeSelected
		// 	},
		// },
		components: {
			appFormSchedule
		}
	}
</script>

<style>
</style>
