<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button @click="socialGoogleLogin">Google</button>
    <button @click="socialFacecbookLogin">Facebook</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    socialGoogleLogin: function () {
      const provide = new firebase.auth.GoogleAuthProvider().addScope('email')
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          // create user in db
          let obj = {
            google_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.additionalUserInfo.profile.picture,
            user_type_id: 1
          }
          console.log(obj)
        })
        .catch(err => {
          alert('Oops. ' + err.message)
        })
    },
    socialFacecbookLogin: function () {
      const provide = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provide)
        .then(result => {
          // create user in db
          let obj = {
            facebook_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.user.photoURL + '?height=500',
            user_type_id: 1
          }
          console.log(obj)
        })
        .catch(err => {
          alert('Oops. ' + err.message)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
