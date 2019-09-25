<template>
  <div>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">
    <b-container>
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
        <b-col cols="12" sm="12" md="12" lg="6" xl="6">
          <br>
          <div>
            <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;">Sign in to LPTT</strong>
          </div>
          <br>
          <b-card>
          <b-form @submit="onSubmit" v-if="show">
            <div>
              <b-form-group id="input-group-1">
                <label class="forminput">Username or email address</label>
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-form-group id="input-group-2">
              <label class="forminput">Password</label>
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                <b-form-checkbox value="me">remember me</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <div>
            <b-button class="blue-gradient btn-block" type="submit">LOGIN</b-button><br>
            <label>or Sign in with</label>
            </div>
            <div>
              <div style="border-bottom: solid 2px #E0e0e0;">
                <b-button class="socialb" style="margin-right:5px;" @click="socialGoogleLogin"><i class="fab fa-google"></i></b-button>
                <b-button class="socialb"><i class="fab fa-facebook" @click="socialFacecbookLogin"></i></b-button>
              </div>
              <div>
                <br>
                <label class="inputsignup">Not a member ?<router-link to="/signup"> Sign Up</router-link></label>
              </div>
            </div>
          </b-form>
          </b-card>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  metaInfo: {
    title: 'Sign in to LPTT',
    titleTemplate: '%s - LPTT',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
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
<style scoped>
@import '../assets/css/login.css';
</style>
