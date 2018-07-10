<template>
  <button v-on:click="addAlert">Add Alert?</button>
</template>

<script>
export default {
  props: {
    time: Number
  },
  methods: {
    addAlert() {
      setTimeout(() => {
        alert('You gotta go')
      }, this.time * 60000);
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  button {
    width: 140px;
    padding: 15px;
    background-color: #66b3fc;
    font-size: 20pt;
  }
</style>

