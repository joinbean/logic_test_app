<template>
  <div>
    <div class="top">
      <div class="numbers">
        <h3>
          {{ currentPage }}
        </h3>
      </div>
      <div class="buttons">
        <button @click="decrement()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.535 3.515L7.05005 12L15.535 20.485L16.95 19.071L9.87805 12L16.95 4.929L15.535 3.515Z" fill="#2E3A59" />
          </svg>
        </button>
        <button @click="increment()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.46495 20.485L16.95 12L8.46495 3.515L7.04995 4.929L14.122 12L7.04995 19.071L8.46495 20.485Z" fill="#2E3A59" />
          </svg>
        </button>
      </div>
    </div>
    <div class="bottom">
      <div class="progress-container">
        <div class="progress" :style="{'width': progress}" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('setQuizMax', 10)
  },
  data: () => ({
    current: 1,
    all: 15
  }),
  computed: {
    currentPage () {
      return this.$store.getters.getQuizCur + '/' + this.$store.getters.getQuizMax
    },
    progress () {
      return ((100 / this.$store.getters.getQuizMax) * this.$store.getters.getQuizCur) + '%'
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
      // this.current = this.current < this.all ? this.current += 1 : this.current
    },
    decrement () {
      this.$store.commit('decrement')
      // this.current = this.current > 1 ? this.current -= 1 : this.current
    }
  }
}
</script>
