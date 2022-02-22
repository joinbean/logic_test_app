<template>
  <div>
    <h3>
      {{ getCurrentTime() }}
    </h3>
  </div>
</template>

<script>
export default {
  data: () => ({
    interval: '',
    time: 120, // 2100,
    currentTime: ''
  }),
  created () {
    this.interval = setInterval(() => this.updateCurrentTime(), 1000)
  },
  methods: {
    getCurrentTime () {
      return this.currentTime
    },
    updateCurrentTime () {
      let minutes = parseInt(this.time / 60, 10)
      let seconds = parseInt(this.time % 60, 10)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      this.currentTime = minutes + ':' + seconds
      this.$store.commit('setResultTime', this.time)

      if (--this.time < 0) {
        this.interval = ''
        this.$store.commit('commitQuiz')
        this.$store.commit('logout')
      }
    },
    cancel () {
    }
  }
}
// export default {
//   data: () => ({
//     interval: '',
//     time: 2100,
//     currentTime: ''
//   }),
//   created () {
//     this.$store.commit('createClockInterval')
//   },
//   methods: {
//     getCurrentTime () {
//       return this.$store.getters.getCurrentTime
//     },
//     updateCurrentTime () {
//       let minutes = parseInt(this.time / 60, 10)
//       let seconds = parseInt(this.time % 60, 10)

//       minutes = minutes < 10 ? '0' + minutes : minutes
//       seconds = seconds < 10 ? '0' + seconds : seconds

//       this.currentTime = minutes + ':' + seconds
//       this.$store.commit('setResultTime', this.time)

//       if (--this.time < 0) {
//         this.cancel()
//       }
//     },
//     cancel () {
//       clearInterval(this.interval)
//       this.quit()
//     }
//   }
// }
</script>
