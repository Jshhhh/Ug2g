<template>
  
</template>

<script>
import key from '../../api.config';
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
