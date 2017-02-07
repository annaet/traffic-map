const cfenv = require('cfenv')
const express = require('express')
const app = express()

app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/map.html')
})

app.get('/traffic_cams', (req, res) => {
  let cams = require('./data/examples/example_traffic_cameras.json')
  res.send(cams)
})

app.get('/car_parks', (req, res) => {
  let carparks = require('./data/examples/example_car_parks.json')
  res.send(carparks)
})

app.get('/roads', (req, res) => {
  let roads = require('./data/examples/example_roads.json')
  res.send(roads)
})

app.get('/bike_points', (req, res) => {
  let bikes = require('./data/examples/example_bike_points.json')
  res.send(bikes)
})

var appEnv = cfenv.getAppEnv()

app.listen(appEnv.port, () => {
  console.log('server starting on ' + appEnv.url)
})
