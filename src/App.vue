<template>
  <div>
    <Navbar />
    <h1>Hello dsfdsdfdsf!</h1>
    <Location />
    <Input />
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue';
  import Location from './components/Location.vue';
  import Input from './components/Input.vue';
  export default {
        name: 'app',
        components: { Navbar, Location, Input } //Register other components
    }
</script>