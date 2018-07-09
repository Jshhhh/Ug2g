<template>
  <div>
    <Navbar />
    <div class="body">
      <h1>Welcome to g2g</h1>
      <div class="location">
        <div id="locWarning" v-if="coord.length === 0">
          Please Get Location
        </div>
        <button v-on:click="getLocation">Get Location</button>
        <div v-if="coord.length > 0">
          latitude: {{coord[0]}}
          longitude: {{coord[1]}}
        </div>
      </div>
      <Input :getDepart="getDepartureLocation"/>
      <div v-if="timeToStation"> 
        Time to walk: {{timeToStation}}
      </div>
      <div v-if="eta">
        <Eta :times="eta" :time2station="minutesToStation"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Navbar from './components/Navbar.vue';
  import Location from './components/Location.vue';
  import Input from './components/Input.vue';
  import Eta from './components/Eta.vue';
  import station from './components/stations';
  export default {
    name: 'app',
    components: { Navbar, Location, Input, Eta }, //Register other components
    methods: {
      getLocation () {
        navigator.geolocation.getCurrentPosition((position) => {
          this.coord = [position.coords.latitude, position.coords.longitude];
        });
      },
      getDepartureLocation(station) {
        axios.get('/directions', {
          params: {
            dept: `${this.coord[0]},${this.coord[1]}`,
            arri: station.coord,
            orig: station.orig
          }
        }).then(res => {
          this.timeToStation = res.data.tts.duration.text;
          this.minutesToStation = Math.ceil(res.data.tts.duration.value / 60);
          this.eta = res.data.eta[0].etd;
        }).catch(err => console.error(err));
      },
    },
    data () {
      return {
        coord: [],
        dept: [],
        timeToStation: '',
        minutesToStation: 0,
        eta: '',
      }
    }
  }
</script>

<style scoped>
  .location {
    margin: 20px;
  }
  #locWarning {
    color: red;
  }
  .body {
    margin-left: 20px;
  }
</style>
