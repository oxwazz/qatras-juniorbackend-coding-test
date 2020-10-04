const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require("path");
const pool = require('../db/postgresql')

const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.resolve(__dirname, `../img`))
        },
        filename: function (req, file, cb) {
          cb(null, 'photo-' + Date.now() + '.jpg')
        }
      })
})

router.post('/bus/photo/:id', upload.single('photo'), async (req, res) => {
    try {
        const { filename } = req.file
        const { id } = req.params
        console.log(req.params.id)
        await pool.query('UPDATE bus SET photo=$1 WHERE id=$2', [filename, id])
        res.send(`photo has been added to bus id: ${id}`)
    } catch(e) {
        res.send(e)
    }
})

router.delete('/bus/photo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = await pool.query('SELECT photo FROM bus WHERE id=$1', [id])
        console.log(rows[0].photo)
        fs.unlinkSync(path.resolve(__dirname, `../img/${rows[0].photo}`))
        await pool.query('UPDATE bus SET photo=null WHERE id=$1', [id])
        res.send(`photo id: ${id} deleted`)
    } catch (e) {
        res.send(e)
    }
})
router.get('/bus/photo/:name',upload.single('photo'), async (req, res) => {
    try {
        const { name } = req.params
        const { rows } = await pool.query('SELECT photo FROM bus WHERE name=$1', [name])
        res.set('Content-Type', 'image/jpg')
        res.send(fs.readFileSync(path.resolve(__dirname, `../img/${rows[0].photo}`)))
    } catch(e) {
        res.send(e)
    }
})

router.get('/bus', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM bus')
        res.send(rows)
    } catch(e) {
        res.send(e)
    }
})

router.post('/bus', async (req, res) => {
    try {
        const { name } = req.body
        await pool.query('INSERT INTO bus (name) VALUES ($1)', [name])
        res.send(`bus '${ name }' added`)
    } catch(e) {
        res.send(e)
    }
})

router.put('/bus/:id', async (req, res) => {
    try {
        const { id }  = req.params
        const { name } = req.body
        console.log(id, name)
        await pool.query('UPDATE bus SET name=$1 WHERE id=$2',[name, id])
        res.send(`bus id: ${id} has change to ${name}`)
    } catch(e) {
        res.send(e)
    }
})

router.delete('/bus/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM bus WHERE id=$1', [id])
        res.send(`bus id: ${id} has deleted`)
    } catch(e) {
        res.send(e)
    }
})

module.exports = router