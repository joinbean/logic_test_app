<template>
  <section class="section admin single">
    <div class="profile-image">
      <b-icon
        icon="account"
        size="is-large"
        type="is-primary"
        class="student-icon"
      />
    </div>
    <div class="background-box single"></div>
    <div class="scroll-box single">
      <div v-if="student" class="block-section">
        <div
        v-for="block in blocks"
        :key="block.id"
        @click="goToSolution(block.id)"
        class="block"
        :style="block.right ?{'background' : '#6AD187'} : {'background' : '#d1716a'}">
          <h3>{{ block.id }}</h3>
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
    student: null
  }),
  async mounted () {
    this.student = this.$store.getters.getStudent

    this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
    // this.$axios.setToken('113|NO6f32QeGhabKkdkqDDK5dhteklnwAKV9agmwjQn', 'Bearer', ['post', 'get'])
    const response = await this.$axios.$get('http://127.0.0.1:8000/api/quiz/' + this.student.quiz_id, null)

    this.$store.commit('setAdminQuiz', response)
    console.log(response)
  },
  computed: {
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
    goToSolution (questionId) {
      console.log(questionId)
      this.$store.commit('setCurrentQuestion', questionId)
      this.$store.commit('setStudent', this.student)
      this.$store.commit('setQuestion', this.questionId)
      this.$router.push('solution')
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
