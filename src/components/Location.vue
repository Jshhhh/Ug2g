<template>
  <div class="location">
    <button v-on:click="getLocation">Get Location</button>
    latitude: {{latitude}}
    longitude: {{longitude}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      latitude: '',
      longitude: '',
    }
  },
  methods: {
    getLocation () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
}
</script>

<style scoped>

</style>
