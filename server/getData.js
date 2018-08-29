const axios = require('axios');
const key = require('../api.config.js');
const station = require('../src/components/stations');

const getDistance = async (depart, arrive) => {
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${depart}&destinations=${arrive}&mode=walking&departure_time=now&key=${key.API_KEY}`)
};

const getEta = async (orig) => {
    return axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${orig}&key=${key.bartKey}&json=y`);
};

const calcDistanceBetween = (x, y) => {
  return Math.pow(y[0] - x[0], 2) + Math.pow(y[1] - x[1], 2);
};

const getClosestStation = (coord) => {
  let closest = {};
  let min = 0;
  for (let key in station) {
    const {gtfs_latitude, gtfs_longitude} = station[key];
    let dist = calcDistanceBetween(coord, [gtfs_latitude, gtfs_longitude]);
    if (min === 0) {
      min = dist;
      closest[key] = station[key].abbr;
    } else if (dist < min) {
      min = dist;
      closest = key;
    }
  }
  return closest;
};

const getNearby = async (coord) => {
  try {
    const currentLocation = coord.split(',').map(elem => JSON.parse(elem));
    const { abbr, gtfs_latitude, gtfs_longitude } = station[getClosestStation(currentLocation)];
    return Promise.all([getDistance(coord, `${gtfs_latitude},${gtfs_longitude}`),
    getEta(abbr)]);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getDistance,
  getEta,
  getNearby
};
