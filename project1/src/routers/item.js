const express = require('express')
const pool = require('../db/postgresql')

const router = express.Router()

router.get('/items', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM items')
        res.status(200).send(rows)
    } catch (e) {
        res.send(e)
    }
})

router.post('/items', async (req, res) => {
    try {
        const { name, desc } = req.body
        const { rowCount } = await pool.query('SELECT * FROM items WHERE item_name=$1', [name])
        
        if (rowCount) {
                throw {error: `item name duplicate`}
         }

        await pool.query('INSERT INTO items (item_name, item_desc) VALUES ($1, $2)', [name, desc])
        res.status(201).send(`Item ${name} added`)
    } catch (e) {
        res.send(e)
    }
})

router.get('/items/:idOrName', async (req, res) => {
    try {
        const { idOrName } = req.params
        const { rows, rowCount } = await pool.query('SELECT * FROM items WHERE item_code=$1 OR item_name=$1', [idOrName])

        if (!rowCount) {
            throw {error: 'item not found'}
        }
        
        res.status(200).send(rows)
    } catch(e) {
        res.send(e)
    }
})

router.put('/items/:id', async (req, res) => {
    try {
        const { name, desc } = req.body
        const { id } = req.params
        const {rowCount} =  await pool.query('UPDATE items SET item_name=$1, item_desc=$2  WHERE item_code=$3', [name, desc, id])

        if (!rowCount) {
            throw {error: 'item not found'}
        }

        res.status(200).send(`id ${id} has change value name to ${name}`)
    } catch(e) {
        res.send(e)
    }
})

router.delete('/items/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { rowCount } =  await pool.query('DELETE FROM items WHERE item_code=$1', [id])
        
        if (!rowCount) {
            throw {error: 'item not found'}
        }
        
        res.status(200).send(`id: ${id} has deleted`)
    } catch(e) {
        res.send(e)
    }
})

module.exports = router