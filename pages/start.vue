<template>
  <section class="section">
    <b-button>
      <NuxtLink to="quiz">
        Start
      </NuxtLink>
    </b-button>
  </section>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
