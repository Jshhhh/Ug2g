<template>
  <div>
    <Navbar />
    <div class="title">
      <h1>Welcome to g2g</h1>
    </div>
    <div class="body">
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
      <Directions :getDepart="getDepartureLocation"/>
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
  import Directions from './components/Directions.vue';
  import Eta from './components/Eta.vue';
  import station from './components/stations';
  export default {
    name: 'app',
    components: { Navbar, Directions, Eta }, //Register other components
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
            arri: station ? station.coord : undefined,
            orig: station ? station.orig : undefined
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
  .title {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .body {
    display: flex;
    margin-left: 20px;
    justify-content: center;
    flex-direction: column;
  }
  .location {
    align-self: center;
  }
  #locWarning {
    color: red;
  }
</style>
