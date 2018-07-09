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
      </h1>
      <h1 id="when" v-else-if="whenToLeave >= 0">
        Ug2g!
      </h1>
      <h1 id="when" v-else>
        You're not gonna make it
      </h1>
    </div>
  </div>
</template>

<script>
export default {
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
    margin-left: 40px;
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
