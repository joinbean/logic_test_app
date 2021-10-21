export const state = () => ({
  quizMax: 1,
  quizCur: 1,
  user: null,
  token: null,
  type: null,
  quiz: null
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
  logout (state) {
    state.user = null
    state.token = null
    state.type = null
  },
  setQuiz (state, quiz) {
    state.quiz = quiz
  }
}

export const getters = {
  getQuizMax: state => state.quizMax,
  getQuizCur: state => state.quizCur,
  authenticated: state => !!state.user,
  getUser: state => state.user,
  getToken: state => state.token,
  getType: state => state.type,
  getQuiz: state => state.quiz
}
