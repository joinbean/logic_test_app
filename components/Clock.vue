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
    time: 30,
    currentTime: ''
  }),
  created () {
    this.$store.commit('createClockInterval')
    // this.interval = setInterval(() => this.updateCurrentTime(), 1000)
  },
  methods: {
    getCurrentTime () {
      return this.$store.getters.getCurrentTime
    },
    updateCurrentTime () {
      let minutes = parseInt(this.time / 60, 10)
      let seconds = parseInt(this.time % 60, 10)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      this.currentTime = minutes + ':' + seconds
      this.$store.commit('setResultTime', this.time)

      if (--this.time < 0) {
        this.cancel()
      }
    },
    cancel () {
      clearInterval(this.interval)
      this.quit()
    }
  }
}
// import { format } from 'date-fns'
// const getCurrentTime = () => format(new Date(), 'mm:ss a')
// export default {
//   data: () => ({
//     currentTime: getCurrentTime()
//   }),
//   methods: {
//     updateCurrentTime () {
//       this.currentTime = getCurrentTime()
//     }
//   },
//   created () {
//     setInterval(() => this.updateCurrentTime(), 1000)
//   }
// }
</script>
