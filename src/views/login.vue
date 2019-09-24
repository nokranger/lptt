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
          <b-card>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <div>
              <br>
              <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;">
                Sign in
              </strong>
              <b-form-group id="input-group-1">
                <label id="forminput">Email address:</label>
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
              <label id="forminput">Your Name:</label>
              <b-form-input
                id="input-2"
                v-model="form.name"
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
            <b-button id="blue-gradient" type="submit" variant="primary">LOGIN</b-button><br><br>
            <label>or Sign in with</label>
            </div>
            <div>
              <div style="border-bottom: solid 2px #E0e0e0;">
                <b-button id="socialb" style="margin-right:5px;" @click="socialGoogleLogin"><i class="fab fa-google"></i></b-button>
                <b-button id="socialb"><i class="fab fa-facebook" @click="socialFacecbookLogin"></i></b-button>
              </div>
              <div>
                <br>
                <label id="inputsignup">Not a member ?<a href=""> Sign Up</a></label>
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
    title: 'Home',
    titleTemplate: '%s - Yay!',
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },
  data () {
    return {
      form: {
        email: '',
        name: '',
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
#forminput {display:block; width:x; height:y; text-align:left;}
#inputsignup {display:block; width:x; height:y; text-align:right;}
#customBtn {
      display: inline-block;
      background: white;
      color: #444;
      width: 190px;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
    }
    #customBtn:hover {
      cursor: pointer;
    }
    span.label {
      font-family: serif;
      font-weight: normal;
    }
    span.icon {
      background: url('/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
      display: inline-block;
      vertical-align: middle;
      width: 42px;
      height: 42px;
    }
    span.buttonText {
      display: inline-block;
      vertical-align: middle;
      padding-left: 42px;
      padding-right: 42px;
      font-size: 14px;
      font-weight: bold;
      /* Use the Roboto font that is loaded in the <head> */
      font-family: 'Roboto', sans-serif;
    }
.fa-facebook, .fa-facebook-square {
    color: #3b5998
}
.fa-twitter, .fa-twitter-square {
    color: #00aced
}
.fa-google-plus, .fa-google-plus-square {
    color: #dd4b39
}
.fa-youtube, .fa-youtube-play, .fa-youtube-square {
    color: #bb0000
}
.fa-tumblr, .fa-tumblr-square {
    color: #32506d
}
.fa-vine {
    color: #00bf8f
}
.fa-flickr {
    color: #ff0084
}
.fa-vimeo-square {
    color: #aad450
}
.fa-pinterest, .fa-pinterest-square {
    color: #cb2027
}
.fa-linkedin, .fa-linkedin-square {
    color: #007bb6
}
.fa-instagram {
    color: #517fa4;
}
.fa-spotify {
    color: #1ED760;
}
.fa-google {
  color: #4285f4;
}
#socialb {
font-size:20px;
background-color: Transparent;
background-repeat:no-repeat;
border: none;
cursor:pointer;
overflow: hidden;
outline:none;
}
#blue-gradient {
    background: linear-gradient(40deg,#45cafc,#303f9f)!important;
    margin: 6px;
    padding: 13.44px 34.24px;
}
.btn-block {
    display: block;
    width: 100%;
}
</style>
