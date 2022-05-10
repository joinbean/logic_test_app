<template>
  <section class="section register-section">
    <div class="form">
      <h3>Bitte registrieren</h3>
      <b-field label="Name" v-show="!error">
        <b-input v-model="name" />
      </b-field>
      <b-field label="Name" message="Enter a name" type="is-danger" v-show="error">
        <b-input v-model="name" />
      </b-field>
      <b-field label="E-mail" v-show="!error">
        <b-input v-model="email" />
      </b-field>
      <b-field label="E-mail" message="Enter valid and unique mail" type="is-danger" v-show="error">
        <b-input v-model="email" />
      </b-field>
      <b-button @click="register">
        Register
      </b-button>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      email: '',
      name: '',
      error: false
    }
  },
  computed: {
  },
  methods: {
    async register () {
      const instance = this
      try {
        const response = await this.$axios.$post('https://twofold.academy/logic/public/api/register', null, {
          params: { name: instance.name, email: instance.email }
        })
        console.log(response.access_token)
        console.log(response.token_type)
        this.$store.commit('setToken', response.access_token)
        this.$store.commit('setType', response.token_type)
        this.$store.commit('setUser', instance.email)
        this.$store.commit('setStatus', 'User')
        this.$router.push('/start')
      } catch (error) {
        switch (error.response.status) {
          case 422:
            this.error = 'Email must be unique'
            console.log('Email must be unique')
            break
          default:
            console.log('Something went wrong')
            break
        }
        this.error = true
        console.log(error)
      }
    }
  }
}
</script>
