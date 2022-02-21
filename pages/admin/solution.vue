<template>
  <section v-if="loaded" class="section quiz-section">
    <div class="content">
      <div class="question-box">
        <img :src="getImg(currentBigImage[0]['url'])">
        <div
          class="solution-box"
        >
          <div
            v-for="image in currentAnswer"
            :key="image.id"
            class="image-box"
          >
            <img v-if="image.id != null" :src="getImg(image.url)">
            <div v-if="image.id == currentSolution[0].solution" class="overlay true"></div>
            <div v-else class="overlay false"></div>
          </div>
        </div>
      </div>
      <div class="answer-box">
        <div
          v-for="image in currentQuestion"
          :key="image.id"
          class="image-box"
        >
          <img
          v-if="image.id != currentAnswer[0].id && image.is_question == false"
          :src="getImg(image.url)">
          <div
          v-if="image.id == currentSolution[0].solution
          && currentAnswer[0].id != currentSolution[0].solution"
          class="overlay true"></div>
        </div>
      </div>
    </div>
    <button @click="back()" class="back-button">Back</button>
  </section>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    image_url: 'http://127.0.0.1:8000/images/',
    student: null,
    quiz: null,
    question: null,
    questions: null,
    loaded: false
  }),
  mounted () {
    this.student = this.$store.getters.getStudent
    this.quiz = this.$store.getters.getAdminQuiz
    this.question = this.$store.getters.getCurrentQuestion
    this.questions = this.$store.getters.getAdminQuiz.data.questions

    this.loaded = true
  },
  computed: {

    currentQuestion () {
      const qst = this.questions.filter(question => question.id === this.question)
      return qst[0].images.filter(question => question.is_question === 0)
    },

    currentBigImage () {
      const qst = this.questions.filter(question => question.id === this.question)
      return qst[0].images.filter(question => question.is_question === 1)
    },

    currentAnswer () {
      const qst = this.questions.filter(question => question.id === this.question)
      const reslt = this.student.answers.filter(question => question.question_id === this.question)
      if (!reslt.length) {
        console.log('array is empty')
        return [{ id: null }]
      }
      return qst[0].images.filter(question => question.id === reslt[0].answer)
    },

    currentSolution () {
      return this.student.solutions.filter(solution => solution.question_id === this.question)
    },

    blocks () {
      const blocks = []
      if (this.student.solutions !== null) {
        for (let i = 0; i < this.student.solutions.length; i++) {
          const block = { id: this.student.solutions[i].question_id }
          if (typeof this.student.answers[i] !== 'undefined' &&
          this.student.answers[i].question_id === this.student.solutions[i].question_id &&
          this.student.answers[i].answer === this.student.solutions[i].solution) {
            block.right = true
          } else {
            block.right = false
          }
          blocks.push(block)
        }
      }
      return blocks
    }
  },
  methods: {
    echo () {
      console.log(this.student)
      console.log(this.quiz)
      console.log(this.questions)
    },
    goToSolution (questionId) {
      console.log(questionId)
      this.$store.commit('setStudent', this.student)
      this.$store.commit('setQuestion', this.questionId)
      this.$router.push('solution')
    },
    getImg (img) {
      return this.image_url + img + '.svg'
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
