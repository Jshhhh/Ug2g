<template>
  <div id="input">
    <p v-bind:style="{color: depart ? 'black' : 'red'}">
    Depart From:
    </p>
    <select v-model="depart">
      <option disabled value="">Depart From</option>
      <option selected>Nearest Station</option>
      <option v-for="(data, key) in stations" :key='key'>{{key}}</option>
    </select>
    <p v-bind:style="{color: arrive ? 'black' : 'red'}">
    Arrive At:
    </p>
    <select v-model="arrive">
      <option disabled value="">Arrive At</option>
      <option v-for="(data, key) in stations" :key='key'>{{key}}</option>
    </select>
    <button v-on:click="setStation">Go</button>
  </div>
</template>

<script>
import stations from './stations.js';
export default {
  props: {
    getDepart: Function
  },
  methods: {
    setStation: function() {
      let depart;
      if (this.depart === 'Nearest Station') {
        this.getDepart();
      } else {
        depart = stations[this.depart];
        this.getDepart({
          coord:`${depart.gtfs_latitude},${depart.gtfs_longitude}`,
          orig: depart.abbr
        });
      }
    }
  },
  data () {
    return {
      stations: stations,
      depart: '',
      arrive: ''
    }
  }
}
</script>

<style scoped>

</style>
