<template>
  <section class="section admin dashboard-section">
    <div class="content">
      <div class="background-box"></div>
      <div v-if="loaded" class="scroll-box dash">
        <div  v-for="item in items" :key="item.id" class="element">
          <StudentCard :student="item" icon="account" :total="2" :points="1" />
        </div>
      </div>
      <div v-else class="scroll-box dash">
        <cube-spin></cube-spin>
      </div>
      <div class="single-view">
        <Points />
        <button @click="logout()">Logout</button>
      </div>
    </div>
  </section>
</template>

<script>
import CubeSpin from 'vue-loading-spinner/components/Cube'
export default {
  middleware: 'authenticated',
  components: {
      CubeSpin
    },
  data: () => ({
    items: [],
    laoded: false
  }),
  async mounted () {
    this.laoded = false
    console.log(this.$store.getters.getToken, this.$store.getters.getType)
    this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
    // this.$axios.setToken('113|NO6f32QeGhabKkdkqDDK5dhteklnwAKV9agmwjQn', 'Bearer', ['post', 'get'])
    const response = await this.$axios.$post('https://twofold.academy/logic/public/api/admin/quizzes', null)

    console.log(response.data)
    this.items = response.data
    this.$store.commit('setStudent', null)
    this.laoded = true
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/admin/login')
    }
  }
}
</script>
