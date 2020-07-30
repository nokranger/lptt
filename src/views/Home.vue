<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="onLogout">Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    onLogout () {
      console.log('test')
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
}
</script>
