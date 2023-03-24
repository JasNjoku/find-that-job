const express = require('express')
const app = express()
const port = 4000
var cors = require('cors')
//routes
const locationRoute = require('./routes/locations')
const jobsRoute = require('./routes/jobs')


app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/locations', locationRoute);
app.use('/jobs', jobsRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
