<template>
  <div id="bar">
    <h1>Ug2g</h1>
    <div id="signIn" @click="signIn" v-if="!signing">
      Sign In
    </div>
    <div id="auth" v-if="signing">
      <Signin />
    </div>
  </div>
</template>

<script>
  import Signin from './Signin.vue';
  export default {
    components: {
      Signin
    },
    methods: {
      signIn() {
        this.signing = true;
      }
    },
    data() {
      return {
        signing: false  
      }
    }
  }
</script>

<style scoped>
  h1 {
    margin-top: 20px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;;
  }
  #bar {
    height: 40px;
    padding: 10px;
    align-content: center;
    color: white;
    background-color: black;
    display: flex;
    justify-content: space-between;
  }
  #signIn {
    cursor: pointer;
  }
  #auth {
    z-index: 10;
  }
</style>

