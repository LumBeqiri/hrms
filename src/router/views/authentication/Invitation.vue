<template>
    <div class="auth-form-placemenet">
      <div class="site-logo">
        <router-link :to="'/'">
          <img src="/images/logo.svg"  height="40px"/>
        </router-link>
      </div>

      <div class="form--login">
        <h4 data-aos="fade-in" data-aos-delay="300">Request an invitation</h4>
        <p>Enter your details below</p>

        <form class="mstr--form">
          <div class="form__item">
            <div class="form__label">
              <label for="user_name" class="form--label">Your name *</label>
            </div>
            <div
              class="form__input form--input-with-icon icon-right"
              :class="{'is-invalid': nameInvalid}"
            >
              <input
                ref="user_name"
                type="text"
                placeholder="Enter your username"
                class="mstr--form mstr--form-input form-control"
                maxlength="25"
                id="user_name"
                name="user_name"
                v-model="user_name"
              />
              <MstrIcon name="person-outline" />
              <p v-if="nameInvalid" class="validation-problem">This field is required.</p>
            </div>
          </div>

          <div class="form__item">
            <div class="form__label">
              <label for="user_name" class="form--label">Your Email *</label>
            </div>
            <div
              class="form__input form--input-with-icon icon-right"
              :class="{'is-invalid': emailInvalid}"
            >
              <input
                ref="user_email"
                type="text"
                placeholder="Enter your email address"
                class="mstr--form mstr--form-input form-control"
                maxlength="25"
                id="user_email"
                name="user_email"
                v-model="user_email"
              />
              <MstrIcon name="person-outline" />
              <p v-if="emailInvalid" class="validation-problem">This field is required.</p>
            </div>
          </div>





          <div class="submit-form">
            <template v-if="loader_active">
              <div class="btn-type-loader">
                  <div class="d-flex justify-content-center mb-3">
                     <b-spinner style="width: 2rem; height: 2rem;" variant="primary" label="Spinning"></b-spinner>
                </div>
              </div>
            </template>
            <template v-else>
              <b-button @click="loginUser" variant="-primary fullwidth ">Sign in</b-button>
            </template>
          </div>

          <div class="form_bottom text-center">
            <p>
             Already have account?

              <router-link :to="{ name : 'login'}" class="color--primary">
                <strong>Login</strong>
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>

</template>

<script>

export default {
  data() {
    return {
      loader_active: false,

      user_name: 'Can',
      nameInvalid: false,

      user_email: 'neve1073',
      emailInvalid: false,
    }
  },
  watch: {
    user_name(newvalue) {
      if (newvalue.length > 3) {
        this.nameInvalid = false
      }
      return newvalue
    },
    user_email(newvalue) {
      if (newvalue.length > 3) {
        this.emailInvalid = false
      }
      return newvalue
    },
  },
  methods: {
    loginUser: function() {
      this.loader_active = true
      let errors = 0
      if (this.user_name == '') {
        this.nameInvalid = true
        this.$refs.username
        errors++
      }

      if (this.user_email == '') {
        this.emailInvalid = true
        this.$refs.user_email
        errors++
      }
      if (errors > 0) {
        this.loader_active = false
        return
      }

      let userDetails = {
        username: this.user_name,
        email: this.user_email,
      }
      this.authenticate_user(userDetails)
    },
    async authenticate_user(userDetails) {

      let response = await this.$store.dispatch(
        'user/auth/authenticate_user',
        userDetails
      )

      this.loader_active = false
      if(response.status !== 401 || response.status !== 404){
          this.$router.push({path : 'app/masters'})
      }

    },
  },
  created() {

  },
}
</script>

<style lang="scss" scoped>
</style>
