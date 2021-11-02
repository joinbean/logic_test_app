export const state = () => ({
  interval: '',
  time: 30,
  currentTime: ''
})

export const mutations = {
  createClockInterval (state) {
    state.interval = setInterval(() => state.updateClockInterval(), 1000)
  },
  updateClockInterval (state) {
    let minutes = parseInt(state.time / 60, 10)
    let seconds = parseInt(state.time % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    state.currentTime = minutes + ':' + seconds
    state.setResultTime = state.time

    if (--state.time < 0) {
      state.cancelClockInterval()
    }
  },
  cancelClockInterval (state) {
    clearInterval(state.interval)
  }
}

export const getters = {
  getCurrentTime: state => state.currentTime
}
