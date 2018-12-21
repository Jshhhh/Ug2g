<template>
  <div class="input">
    <div id="depart">
    <p v-bind:style="{color: depart ? 'black' : 'red'}">
    Depart From:
    </p>
    <select v-model="depart">
      <option disabled value="">Depart From</option>
      <option selected>Nearest Station</option>
      <option v-for="(data, key) in stations" :key='key'>{{key}}</option>
    </select>
    </div>
    <div id="arrive">
    <p v-bind:style="{color: arrive ? 'black' : 'red'}">
    Arrive At:
    </p>
    <select v-model="arrive">
      <option disabled value="">Arrive At</option>
      <option v-for="(data, key) in stations" :key='key'>{{key}}</option>
    </select>
    </div>
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
  .input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  #arrive {
    margin-left: 40px;
  }
  button {
    width: 50px;
    height: 20px;
    margin: 45px 0 0 20px;
  }
  select {
    padding: 10px;
  }
</style>
