<template>
    <div>
        <button class="btn btn-primary w-100" @click="log()">Cari Bus</button>
        <hr>
        <!-- <p>Jadwal Bus {{ departSelected }}  - {{ arrivalSelected }}  | {{ timeSelected }}</p> -->
        <div v-for="schedule in schedules" :key="schedule" class="border rounded mb-3" style="height: 110px; Xbackground-color: yellow;">
            <div class="py-2 px-3 row" >
                <div class="col">
                    <p class="nopadding">Bus {{schedule.bus}}</p>
                    <p class="h3 font-weight-bold nopadding">{{ takeTime(schedule.depart_time) }}</p>
                    <p class="text-muted" style="font-size: 12px; padding-left: 4px">Dari {{ schedule.station_depart }}</p>
                </div>
                <div class="col">
                    <p class="h3 font-weight-bold nopadding" style="padding-top:25px;">{{ takeTime(schedule.arrival_time) }}</p>
                    <p class="text-muted" style="font-size: 12px; padding-left: 4px;">Sampai {{ schedule.station_arrival }}</p>
                </div>
                <div class="col">
                    <p class="h3 font-weight-bold nopadding" style="padding-top:25px;">{{ estimasi(schedule.depart_time, schedule.arrival_time) }}</p>
                    <p class="text-muted" style="font-size: 12px; padding-left: 4px">Estimasi</p>
                </div>
                <div class="col">
                    <img :src="takeImage(schedule.bus)" style="height: 88px;">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    const axios = require('axios')
	export default {
        props: ['departSelected', 'arrivalSelected', 'timeSelected'],
        data() {
            return {
                schedules: []
            }
        },
        methods: {
            takeTime(val) {
                return new Date(val).toTimeString().slice(0,5)
            },
            takeImage(val) {
                return 'http://localhost:3000/bus/photo/' + val
            },
            async log() {
                const res = await axios.get(`http://localhost:3000/schedule/search?departStation=${this.departSelected}&arrivalStation=${this.arrivalSelected}&arrivalTime=${this.timeSelected}`)
                this.schedules = res.data
            },
            estimasi(val1, val2) {
                let a = this.takeTime(val1).split(":")
                let b = this.takeTime(val2).split(":")
                let result = (b[0]-a[0])*60-(a[1]-b[1])
                return `${result} Menit`
            }
        },
    }
</script>

<style scoped>
    .nopadding {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
    }
</style>
