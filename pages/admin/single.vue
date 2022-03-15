<template>
  <section class="section admin single">
    <div class="profile-image">
        <img src="https://img.icons8.com/ios-glyphs/90/000000/user--v1.png"/>
      <!-- <b-icon
        icon="account"
        size="is-large"
        type="is-primary"
        class="student-icon"
        style="color:black"
      /> -->
    </div>
    <div v-if="student">
      <h3 class="profile-name">{{ student.name }}</h3>
      <h3 class="percentage">Richtig gelöst {{ percentage }}%</h3>
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
        <div class="block" style="background:transparent"></div>
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
    const response = await this.$axios.$get('https://twofold.academy/logic/public/api/quiz/' + this.student.quiz_id, null)

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
    },
    percentage () {
      let right = 0
      if (this.student.solutions !== null) {
        for (let i = 0; i < this.student.solutions.length; i++) {
          if (typeof this.student.answers[i] !== 'undefined' &&
          this.student.answers[i].question_id === this.student.solutions[i].question_id &&
          this.student.answers[i].answer === this.student.solutions[i].solution) {
            right++
          }
        }
        return Math.round(100 * right / this.student.solutions.length)
      }
      return 0
    }
  },
  methods: {
    goToSolution (questionId) {
      this.$store.commit('setCurrentQuestion', questionId)
      this.$store.commit('setStudent', this.student)
      this.$store.commit('setQuestion', this.questionId)
      this.$router.push('/admin/solution')
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
