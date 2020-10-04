const express = require('express')
const cors = require('cors')
const routerBus = require('./routers/bus')
const routerStation = require('./routers/station')
const routerSchedule = require('./routers/schedule')

const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use(routerBus)
app.use(routerStation)
app.use(routerSchedule)

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})