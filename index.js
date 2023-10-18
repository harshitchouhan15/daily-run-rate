const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const drrRoute = require('./DRR')
const cors = require('cors')
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('connected to mongodb.')).catch((err)=>console.log(err))

app.use('/api/drr', drrRoute)

app.listen(process.env.PORT || 5500, ()=>console.log('Backend server is running.'))

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});