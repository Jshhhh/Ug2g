<template>
  <div id="input">
    Depart From:
    <select v-model="depart">
      <option disabled value="">Depart From</option>
      <option v-for="(data, key) in stations" :key='key'>{{key}}</option>
    </select>
    Arrive At:
    <select v-model="arrive">
      <option disabled value="">Arrive At</option>
      <option v-for="(data, key) in stations" :key='key'>{{key}}</option>
    </select>
    <button v-on:click="getDepartureLocation">Go</button>
  </div>
</template>

<script>
import axios from 'axios';
import stations from './stations.js';
export default {
  methods: {
    getDepartureLocation() {
      console.log(this.stations[this.depart].abbr, this.stations[this.arrive].abbr);
      axios.get('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
      .then((res) => {
        
      }).catch(err => console.log(err));
    }
  },
  data () {
    return {
      stations: stations,
      departure: {
        latitude: '',
        longitude: ''
      },
      depart: '',
      arrive: ''
    }
  }
}
</script>

<style scoped>

</style>
