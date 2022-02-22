<template>
  <section class="section">
    <div class="dark-theme">
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',

  mounted () {
    this.$router.push('/register')
  }
}
</script>
