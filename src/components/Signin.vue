<template>
  <div id="signIn">
    <form @submit.prevent="handleSubmit">
      <label>Username:</label>
      <input type="text" v-model="username"/>
      <label>Password:</label>
      <input type="password" v-model="password"/>
      <label v-if="isNewUser">Confirm:</label>
      <input type="password" v-model="confirmPw" v-if="isNewUser"/>
      <button type="submit">Submit</button>
      <div id="newUser" @click="newUser" v-if="!isNewUser">
        New User?
      </div>
      <div id="warning" v-if="mismatchPw">Passwords dont match</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    handleSubmit() {
      if (this.isNewUser && (this.password !== this.confirmPw)) {
        this.mismatchPw = true;
        return;
      } else {
        this.mismatchPw = false;
        axios.post('/authenticate', {
          params: {
            username: this.username,
            password: this.password
          }
        });
      }
    },
    newUser() {
      this.isNewUser = true;
    }
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPw: '',
      mismatchPw: false,
      isNewUser: false
    }
  }
}
</script>

<style scoped>
  #warning {
    color: red;
  }  
</style>
