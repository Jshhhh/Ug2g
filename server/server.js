const express = require('express');
const path = require('path');
const axios = require('axios');
const ask = require('./getData');

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/directions', async (req, res) => {
  let directions, endpoints;
  if (req.query.arri === undefined) {
    try {
      [directions, endpoints] = await ask.getNearby(req.query.dept);
    } catch(err) {
      res.status(500).send(err);
    }
  } else {
    try {
      directions = await ask.getDistance(req.query.dept, req.query.arri);
      endpoints = await ask.getEta(req.query.orig);
    } catch(err) {
      res.status(500).send(err);
    }
  }
  res.send({
    tts: directions.data.rows[0].elements[0],
    eta: endpoints.data.root.station
  });
});

app.post('/authenticate')

app.listen(3000, () => console.log('server started at localhost:3000'));