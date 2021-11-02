<template>
  <section style="margin-top:400px">
    <input v-bind="email" />
    <input v-bind="password" />
    <button @click="login">login</button>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async login () {
      const instance = this
      try {
        const response = await this.$axios.$post('http://127.0.0.1:8000/api/admin/login', null, {
          params: { email: 'leitunginformatik@twofold.swiss', password: 'Passwort' }
        })
        console.log(response.access_token)
        console.log(response.token_type)
        this.$store.commit('setToken', response.access_token)
        this.$store.commit('setType', response.token_type)
        this.$store.commit('setUser', instance.email)
        this.$router.push('dashboard')
      } catch (error) {
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
