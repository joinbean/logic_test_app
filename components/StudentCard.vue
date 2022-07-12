<template>
  <div class="column">
    <div class="student-card">
      <div class="student-image">
        <img src="https://img.icons8.com/ios-glyphs/90/000000/user--v1.png"/>
        <!-- <b-icon
          :icon="icon"
          size="is-large"
          custom-class="icon-4x"
          type="is-dark"
          class="student-icon"
        /> -->
      </div>
      <div class="student-info">
        <div class="bottom-group top">
          <p>{{ student.name }}</p>
          <button @click="deleteThisUser(student.id)">
            <svg style="margin-left: 4px;margin-top: 5px;" height="40" width="35" xmlns="http://www.w3.org/2000/svg"><path transform="scale(0.03)" d="M0 281.296l0 -68.355q1.953 -37.107 29.295 -62.496t64.449 -25.389l93.744 0l0 -31.248q0 -39.06 27.342 -66.402t66.402 -27.342l312.48 0q39.06 0 66.402 27.342t27.342 66.402l0 31.248l93.744 0q37.107 0 64.449 25.389t29.295 62.496l0 68.355q0 25.389 -18.553 43.943t-43.943 18.553l0 531.216q0 52.731 -36.13 88.862t-88.862 36.13l-499.968 0q-52.731 0 -88.862 -36.13t-36.13 -88.862l0 -531.216q-25.389 0 -43.943 -18.553t-18.553 -43.943zm62.496 0l749.952 0l0 -62.496q0 -13.671 -8.789 -22.46t-22.46 -8.789l-687.456 0q-13.671 0 -22.46 8.789t-8.789 22.46l0 62.496zm62.496 593.712q0 25.389 18.553 43.943t43.943 18.553l499.968 0q25.389 0 43.943 -18.553t18.553 -43.943l0 -531.216l-624.96 0l0 531.216zm62.496 -31.248l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224zm31.248 -718.704l374.976 0l0 -31.248q0 -13.671 -8.789 -22.46t-22.46 -8.789l-312.48 0q-13.671 0 -22.46 8.789t-8.789 22.46l0 31.248zm124.992 718.704l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224zm156.24 0l0 -406.224q0 -13.671 8.789 -22.46t22.46 -8.789l62.496 0q13.671 0 22.46 8.789t8.789 22.46l0 406.224q0 13.671 -8.789 22.46t-22.46 8.789l-62.496 0q-13.671 0 -22.46 -8.789t-8.789 -22.46zm31.248 0l62.496 0l0 -406.224l-62.496 0l0 406.224z"/></svg>
          </button>
        </div>

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
      this.$router.push('/admin/single')
    },
    async deleteThisUser (id) {
      const stdid = id
      this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
      const response = await this.$axios.$post('https://twofold.academy/logic/public/api/quiz/' + stdid, null)
      console.log(response)
    }
  }
}
</script>
