<template>
	<div>
		<div class="form-row mb-3">
			<div class="col">
				<label>Dari Terminal:</label>
				<select class="form-control" v-model="departSelected">
					<option v-for="station in stations" :key="station.id" :value="station.name">{{station.name}}</option>
				</select>
			</div>
			<div class="col">
				<label>Ke Terminal:</label>
				<select class="form-control" v-model="arrivalSelected">
					<option v-for="station in stations" :key="station.id" :value="station.name">{{station.name}}</option>
				</select>
			</div>
			<div class="col">
				<label>Tanggal pergi:</label>
				<select class="form-control" v-model="timeSelected">
					<option v-for="time in departTime" :key="time" :value="time.date.slice(0,10)">{{time.date.slice(0,10)}}</option>
				</select>
			</div>
		</div>
		<app-detail-schedule 
				:departSelected= 'departSelected'
				:arrivalSelected= 'arrivalSelected'
				:timeSelected= 'timeSelected'>
		</app-detail-schedule>
	</div>
</template>

<script>
	const axios = require('axios')

	import appDetailSchedule from './appDetailSchedule.vue'

	export default {
        async created () {
            const resStation = await axios.get('http://localhost:3000/station')
			this.stations = resStation.data
			
			const resSchedule = await axios.get('http://localhost:3000/schedule/date')
			this.departTime = resSchedule.data 
        },
        data() {
            return {
				stations: [],
				departTime: [],
				departSelected: '',
				arrivalSelected: '',
				timeSelected: ''
            }
		},
		components: {
			appDetailSchedule
		},
    }
</script>

<style>
</style>
