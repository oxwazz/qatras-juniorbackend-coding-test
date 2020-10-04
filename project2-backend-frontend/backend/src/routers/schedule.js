const express = require('express')
const pool = require('../db/postgresql')

const router = express.Router()

// router.get('/schedule', async (req, res) => {
//     try {
//         const { rows } = await pool.query('SELECT * FROM schedule')
//         res.send(rows)
//     } catch(e) {
//         res.send(e)
//     }
// })

router.post('/schedule', async (req, res) => {
    try {
        const { bus, stationDepart, stationArrival, departTime, arrivalTime } = req.body
        await pool.query('INSERT INTO schedule (bus_id, station_depart_id, station_arrival_id, depart_time, arrival_time) VALUES ($1,$2,$3,$4,$5)', [bus, stationDepart, stationArrival, departTime, arrivalTime])
        res.send(`schedule added`)
    } catch(e) {
        res.send(e)
    }
})

router.put('/schedule/:id', async (req, res) => {
    try {
        const { id }  = req.params
        const { bus, stationDepart, stationArrival, departTime, arrivalTime } = req.body
        await pool.query('UPDATE schedule SET bus_id=$1, station_depart_id=$2, station_arrival_id=$3, depart_time=$4, arrival_time=$5 WHERE id=$6',[bus, stationDepart, stationArrival, departTime, arrivalTime, id])
        res.send(`schedule id: ${id} has change`)
    } catch(e) {
        res.send(e)
    }
})

router.delete('/schedule/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM schedule WHERE id=$1', [id])
        res.send(`schedule id: ${id} has deleted`)
    } catch(e) {
        res.send(e)
    }
})

router.get('/schedule/date', async (req, res) => {
    try {
        const { rows } = await pool.query('select DISTINCT DATE(depart_time) from schedule ORDER BY DATE(depart_time) ASC')
        res.send(rows)
    } catch(e) {
        res.send(e)
    }
})

// router.get('/schedule/detail', async (req, res) => {
//     try {
//         const { rows } = await pool.query(
//             `SELECT schedule.id, bus.name as bus, depart.name as station_depart, arrival.name as station_arrival, depart_time, arrival_time FROM schedule
//             INNER JOIN bus ON schedule.bus_id = bus.id
//             INNER JOIN station as depart ON schedule.station_depart_id = depart.id
//             INNER JOIN station as arrival ON schedule.station_arrival_id = arrival.id`)
//         res.send(rows)
//     } catch(e) {
//         res.send(e)
//     }
// })

router.get('/schedule/search', async (req, res) => {
    try {
        // const { departStation, arrivalStation, arrivalTime} = req.body
        const { departStation, arrivalStation, arrivalTime} = req.query
        console.log(departStation, arrivalStation, arrivalTime)
        const { rows } = await pool.query(
            `SELECT schedule.id, bus.name as bus, depart.name as station_depart, arrival.name as station_arrival, depart_time, arrival_time FROM schedule
            INNER JOIN bus ON schedule.bus_id = bus.id
            INNER JOIN station as depart ON schedule.station_depart_id = depart.id
            INNER JOIN station as arrival ON schedule.station_arrival_id = arrival.id
            WHERE depart.name='${departStation}' AND arrival.name='${arrivalStation}' AND depart_time >= to_timestamp('${arrivalTime} 00:00:00', 'yyy-mm-dd hh24:mi:ss') AND depart_time <= to_timestamp('${arrivalTime} 23:59:59', 'yyy-mm-dd hh24:mi:ss')`)
        res.send(rows)
    } catch(e) {
        res.send(e)
    }
})

module.exports = router