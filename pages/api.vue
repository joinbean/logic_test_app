<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Just start  <b-icon
        icon="rocket"
        size="is-large"
      />"
    </h2>
    <h3 class="subtitle is-6 has-text-grey">
      Author: <a href="https://github.com/anteriovieira">
        Antério Vieira
      </a>
    </h3>
    <h3 class="subtitle is-6 has-text-grey">
      {{ ip }}
    </h3>
    <h3 v-if="$store.getters.getUser">
      {{ $store.getters.getUser }}
    </h3>
    <b-button @click="login">
      login
    </b-button>
    <b-button @click="check">
      check
    </b-button>
    <b-button @click="logout">
      logout
    </b-button>
  </section>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const ip = await $axios.$get('http://127.0.0.1:8000/api/no')
    return { ip }
  },
  data () {
    return {
      data: {
        email: 'hans@hans.com'
      }
    }
  },
  methods: {
    async login () {
      const ip = await this.$axios.$post('http://127.0.0.1:8000/api/login', null, {
        params: { email: 'hans@hans.com' }
      })
      this.$axios.setToken(ip.access_token, ip.token_type, ['post', 'get'])
      this.$store.commit('setUser', 'hans@hans.com')
      console.log(this.$store.getters.getUser)
      console.log(ip)
    },
    async check () {
      const ip = await this.$axios.$post('http://127.0.0.1:8000/api/me')
      console.log(ip)
    },
    logout () {
      this.$axios.setToken('', 'bearer', ['post', 'get'])
      this.$store.commit('setUser', null)
    }
  }
}
</script>
