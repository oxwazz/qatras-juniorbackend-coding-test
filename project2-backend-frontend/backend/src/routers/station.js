const express = require('express')
const pool = require('../db/postgresql')

const router = express.Router()

router.get('/station', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM station')
        res.send(rows)
    } catch(e) {
        res.send(e)
    }
})

router.post('/station', async (req, res) => {
    try {
        const { name } = req.body
        await pool.query('INSERT INTO station (name) VALUES ($1)', [name])
        res.send(`station '${ name }' added`)
    } catch(e) {
        res.send(e)
    }
})

router.put('/station/:id', async (req, res) => {
    try {
        const { id }  = req.params
        const { name } = req.body
        console.log(id, name)
        await pool.query('UPDATE station SET name=$1 WHERE id=$2',[name, id])
        res.send(`station id: ${id} has change to ${name}`)
    } catch(e) {
        res.send(e)
    }
})

router.delete('/station/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM station WHERE id=$1', [id])
        res.send(`station id: ${id} has deleted`)
    } catch(e) {
        res.send(e)
    }
})

module.exports = router