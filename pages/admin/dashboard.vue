<template>
  <section>
    <div class="content">
      <div class="scroll-box">
        <div v-for="item in items" :key="item.id">
          {{ item }}
        </div>
      </div>
      <div class="single-view">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    items: ''
  }),
  async mounted () {
    console.log(this.$store.getters.getToken, this.$store.getters.getType)
    this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
    // this.$axios.setToken('113|NO6f32QeGhabKkdkqDDK5dhteklnwAKV9agmwjQn', 'Bearer', ['post', 'get'])
    const response = await this.$axios.$post('http://127.0.0.1:8000/api/admin/quizzes', null)

    console.log(response.data)
    this.items = response
  }
}
</script>
