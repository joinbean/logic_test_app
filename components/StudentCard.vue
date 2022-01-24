<template>
  <div class="column">
    <div class="student-card">
      <div class="student-image">
        <b-icon
          :icon="icon"
          size="is-large"
          type="is-primary"
          class="student-icon"
        />
      </div>
      <div class="student-info">
        <p>{{ student.name }}</p>
        <div class="progress-bar">
          <div class="bar" :style="styles"></div>
        </div>
        <div class="bottom-group">
          <button @click="goToSingle">Auswertung</button>
          <p>{{ score.points }}/{{ score.total }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    styles () {
      return { width: Math.round(100 * this.score.points / this.score.total) + '%' }
    },
    score () {
      let total = 0
      let points = 0
      if (this.student.solutions !== null) {
        for (let i = 0; i < this.student.solutions.length; i++) {
          total += 1
          if (typeof this.student.answers[i] !== 'undefined' &&
          this.student.answers[i].question_id === this.student.solutions[i].question_id &&
          this.student.answers[i].answer === this.student.solutions[i].solution) {
            points += 1
          }
        }
      }
      return { points, total }
    }
  },
  methods: {
    goToSingle () {
      this.$store.commit('setStudent', this.student)
      this.$router.push('single')
    }
  }
}
</script>
