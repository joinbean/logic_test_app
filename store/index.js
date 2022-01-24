export const state = () => ({
  quizMax: 1,
  quizCur: 1,
  user: null,
  token: null,
  type: null,
  status: null,
  quiz: null,
  answer:
  {
    data: {
      result_id: '',
      time: '',
      questions: []
    }
  },
  interval: '',
  time: 2100,
  currentTime: '',
  audio: '',
  audioPlay: false,
  student: null,
  questionId: null,
  adminQuiz: null,
  currentQuestion: 5
})

export const mutations = {
  increment (state) {
    state.quizCur = state.quizCur < state.quizMax
      ? state.quizCur = state.quizCur + 1
      : state.quizMax
  },
  decrement (state) {
    state.quizCur = state.quizCur > 1
      ? state.quizCur = state.quizCur - 1
      : state.quizCur
  },
  setQuizMax (state, val) {
    state.quizMax = val
  },
  setUser (state, userMail) {
    state.user = userMail
  },
  setToken (state, token) {
    state.token = token
  },
  setType (state, type) {
    state.type = type
  },
  setStatus (state, status) {
    state.status = status
  },
  logout (state) {
    state.user = null
    state.token = null
    state.type = null
    state.status = null
  },
  setQuiz (state, quiz) {
    state.quiz = quiz
  },
  resetAnswer (state) {
    state.answer = {
      data: {
        result_id: '',
        time: '',
        questions: []
      }
    }
  },
  setQuizCur (state, nmb) {
    state.quizCur = nmb
  },
  setResultId (state, id) {
    state.answer.data.result_id = id
  },
  setResultTime (state, time) {
    state.answer.data.time = time
  },
  addResultQuestion (state, data) {
    const foundIndex = state.answer.data.questions.findIndex(x => x.id === parseInt(data.question))
    if (parseInt(foundIndex) !== -1) {
      state.answer.data.questions[foundIndex].answer_id = data.answer
    } else {
      state.answer.data.questions.push(
        {
          id: data.question,
          answer_id: data.answer
        }
      )
    }
  },
  createClockInterval (state) {
    state.interval = setInterval(() => this.commit('updateClockInterval'), 1000)
  },
  updateClockInterval (state) {
    let minutes = parseInt(state.time / 60, 10)
    let seconds = parseInt(state.time % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    state.currentTime = minutes + ':' + seconds
    state.setResultTime = state.time

    if (--state.time < 0) {
      this.commit('cancelClockInterval')
      this.commit('commitQuiz')
      this.commit('logout')
    }
  },
  cancelClockInterval (state) {
    clearInterval(state.interval)
    state.time = 2100
    state.interval = ''
    state.currentTime = ''
  },
  async commitQuiz (state) {
    this.commit('setResultTime', state.time)
    this.$axios.setToken(state.token, state.type, ['post', 'get'])
    const response = await this.$axios.$post('http://127.0.0.1:8000/api/quiz', state.answer)
    console.log(response)
    this.$router.push('/finish')
  },
  setAudio (state, audio) {
    state.audio = audio
  },
  setAudioPlay (state, audio) {
    state.audioPlay = audio
  },
  setStudent (state, student) {
    state.student = student
  },
  setQuestion (state, questionId) {
    state.questionId = questionId
  },
  setAdminQuiz (state, quiz) {
    state.adminQuiz = quiz
  },
  setCurrentQuestion (state, curQuestion) {
    state.currentQuestion = curQuestion
  }
}

export const getters = {
  getQuizMax: state => state.quizMax,
  getQuizCur: state => state.quizCur,
  authenticated: state => !!state.user,
  getUser: state => state.user,
  getToken: state => state.token,
  getType: state => state.type,
  getStatus: state => state.status,
  getQuiz: state => state.quiz,
  getTime: state => state.answer.time,
  getResult: state => state.answer,
  getCurrentTime: state => state.currentTime,
  getAudio: state => state.audio,
  getAudioPlay: state => state.audioPlay,
  getStudent: state => state.student,
  getQuestionId: state => state.questionId,
  getAdminQuiz: state => state.adminQuiz,
  getCurrentQuestion: state => state.currentQuestion
}
