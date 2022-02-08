<template>
  <section class="section register-section">
    <div class="form">
      <b-field label="Email" v-show="!error">
        <b-input v-model="email" />
      </b-field>
      <b-field label="Email" message="Enter valid and unique mail" type="is-danger" v-show="error">
        <b-input v-model="email" />
      </b-field>
      <b-field label="Password" v-show="!error">
        <b-input v-model="password" />
      </b-field>
      <b-field label="Password" message="Enter a password" type="is-danger" v-show="error">
        <b-input v-model="password" />
      </b-field>
      <b-button @click="login">
        Login
      </b-button>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'notAuthenticated',
  data: () => ({
    email: '',
    password: '',
    error: false
  }),
  methods: {
    async login () {
      const instance = this
      console.log(instance.email, instance.password)
      try {
        const response = await this.$axios.$post('https://twofold.academy/logic/public/api/admin/login', null, {
          params: { email: 'leitunginformatik@twofold.swiss', password: 'Passwort' }
        })
        console.log(response.access_token)
        console.log(response.token_type)
        this.$store.commit('setToken', response.access_token)
        this.$store.commit('setType', response.token_type)
        this.$store.commit('setUser', instance.email)
        this.$store.commit('setStatus', 'Admin')
        this.$router.push('dashboard')
      } catch (error) {
        this.error = true
        console.log(error)
      }
    }
  }
  // async mounted () {
  //   // this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
  //   this.$axios.setToken('113|NO6f32QeGhabKkdkqDDK5dhteklnwAKV9agmwjQn', 'Bearer', ['post', 'get'])
  //   const response = await this.$axios.$get('http://127.0.0.1:8000/api/admin/quizzes', null)

  //   console.log(response.data)
  //   this.items = response
  // }
}
</script>
