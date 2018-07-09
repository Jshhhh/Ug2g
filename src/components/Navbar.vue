<template>
  <div id="bar">
    <h1>Ug2g</h1>
    <div id="signIn" @click="signIn">
      Sign In
      <div id="auth" v-if="signing">
        Authorizing Page
      </div>
    </div>

  </div>
</template>

<script>
  module.exports = {
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

