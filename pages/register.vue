<template>
  <section class="section">
    <b-input v-model="name" />
    <b-input v-model="email" />
    <b-button @click="register">
      Register
    </b-button>
  </section>
</template>

<script>
export default {
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
        const response = await this.$axios.$post('http://127.0.0.1:8000/api/register', null, {
          params: { name: instance.name, email: instance.email }
        })
        console.log(response.access_token)
        console.log(response.token_type)
        this.$store.commit('setToken', response.access_token)
        this.$store.commit('setType', response.token_type)
        this.$store.commit('setUser', instance.email)
        this.$router.push('start')
      } catch (error) {
        switch (error.response.status) {
          case 422:
            console.log('Email must be unique')
            break
          default:
            console.log('Something went wrong')
            break
        }
        this.error = true
        // console.log(error)
      }
    }
  }
}
</script>
