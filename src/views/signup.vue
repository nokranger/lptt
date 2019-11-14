<template>
  <div>
    <meta charset="utf-8" />
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport" />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"
      integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S"
      crossorigin="anonymous"
    />
    <b-container>
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
        <b-col cols="12" sm="12" md="12" lg="6" xl="6">
          <br />
          <div>
            <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;">
              Create your personal
              account
            </strong>
          </div>
          <br />
          <b-card>
            <b-form @submit="onSubmit" v-if="show">
              <div>
                <b-form-group id="input-group-1">
                  <label class="forminput">
                    Name
                    <label style="color:red;">*</label>
                  </label>
                  <b-form-input id="input-4" v-model="form.name" type="text" required placeholder></b-form-input>
                </b-form-group>
              </div>
              <div>
                <div>
                  <b-form-group id="input-group-1">
                    <label class="forminput">
                      Lastname
                      <label style="color:red;">*</label>
                    </label>
                    <b-form-input id="input-4" v-model="form.lastname" type="text" required placeholder></b-form-input>
                  </b-form-group>
                </div>
                <b-form-group id="input-group-1">
                  <label class="forminput">
                    Username
                    <label style="color:red;">*</label>
                  </label>
                  <b-form-input id="input-1" v-model="form.username" type="text" required placeholder></b-form-input>
                  <label style="font-size:10px;display:block;text-align:left;color:gray;">
                    We'll never share your email
                    with anyone else.
                  </label>
                </b-form-group>
              </div>
              <div>
                <b-form-group id="input-group-3">
                  <label class="forminput">
                    Email address
                    <label style="color:red;">*</label>
                  </label>
                  <b-form-input id="input-3" v-model="form.email" type="email" required placeholder></b-form-input>
                  <label style="font-size:10px;display:block;text-align:left;color:gray;">
                    We’ll occasionally send
                    updates about your account to this inbox. We’ll never share your email address with anyone.
                  </label>
                </b-form-group>
              </div>
              <div>
                <b-form-group id="input-group-2">
                  <label class="forminput">
                    Password
                    <label style="color:red;">*</label>
                  </label>
                  <b-form-input id="input-2" v-model="form.password" type="password" required placeholder></b-form-input>
                  <label style="font-size:10px;display:block;text-align:left;color:gray;">
                    Make sure it's at least 15
                    characters OR at least 8 characters including a number and a lowercase letter. Learn more.
                  </label>
                </b-form-group>
              </div>
              <div>

                <b-button class="blue-gradient btn-block" type="button" @click="onSignup">Create an account</b-button>
                <br />
                <label>or Sign up with</label>
              </div>
              <div>
                <div>
                  <b-button class="socialb" style="margin-right:5px;" @click="socialGoogleLogin">
                    <i class="fab fa-google"></i>
                  </b-button>
                  <b-button class="socialb">
                    <i class="fab fa-facebook" @click="socialFacecbookLogin"></i>
                  </b-button>
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
import axios from 'axios'
export default {
  metaInfo: {
    title: 'Sign up to LPTT',
    titleTemplate: '%s - LPTT',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },
  data() {
    return {
      form: {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSignup () {
      console.log('test')
      axios.post('https://lptt-28ae9.firebaseio.com/users/signup.json', this.form).then(response => {
        console.log(response)
      }).catch(e => {
        // this.error.push(e)
      })
      
    },
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
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
    socialGoogleLogin() {
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
    socialFacecbookLogin() {
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
  },
  created () {
    // axios.get('https://lptt-28ae9.firebaseio.com/users/signup.json').then(response => {
    //   console.log(response.data)
    // })
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
