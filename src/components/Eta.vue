<template>
  <div id="Eta">
    <table>
      <tr>
        <th>Destination</th>
        <th>Times</th>
      </tr>
      <tr v-for="(elem, index) in times" :key="index">
        <td>{{elem.destination}}</td>
        <td class="time" v-for="(time, i) in elem.estimate" :key="i" @click="getTime">
          {{time.minutes}}
        </td>
      </tr>
    </table>
    <div id="timeClicked" v-if="timeClicked">
      <h1 id="when" v-if="whenToLeave > 1">
        You should leave in {{whenToLeave}} minutes
        <Alert :time="whenToLeave"/>
      </h1>
      <h1 id="when" v-else-if="whenToLeave >= 0">
        U gotta go!
      </h1>
      <h1 id="when" v-else>
        You're not gonna make it
      </h1>
    </div>
  </div>
</template>

<script>
import Alert from './Alert.vue';
export default {
  components: {
    Alert
  },
  props: {
    times: Array,
    time2station: Number,
  },
  methods: {
    getTime(e) {
      this.whenToLeave = e.target.innerText - this.time2station - 1;
      this.timeClicked = true;
    }
  },
  data() {
    return {
      whenToLeave: 0,
      timeClicked: false,
    }
  }
}
</script>

<style scoped>
  #Eta {
    display: flex;
  }
  #when {
    display: flex;
    margin-left: 40px;
    flex-direction: column;
    align-items: center;
  }
  table {
    border: 2px solid black;
  }
  th {
    border: 1px solid black;
  }
  td {
    border: 1px solid black;
  }
  .time {
    cursor: pointer;
  }
</style>
