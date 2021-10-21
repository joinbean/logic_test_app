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
    <b-button @click="check">
      check
    </b-button>
  </section>
</template>

<script>
export default {
  middleware: 'authenticated',
  methods: {
    async check () {
      const ip = await this.$axios.$post('http://127.0.0.1:8000/api/me')
      console.log(ip)
    }
  }
}
</script>
