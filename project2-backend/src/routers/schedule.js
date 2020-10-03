const express = require('express')
const pool = require('../db/postgresql')

const router = express.Router()

router.get('/schedule', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM schedule')
        res.send(rows)
    } catch(e) {
        res.send(e)
    }
})

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

module.exports = router