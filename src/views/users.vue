<template>
  <div class="wrapper">
    ยินดีต้อนรับ
    <button @click="onLogout">Logout</button>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  data () {
    return {}
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
<style scoped>

</style>
