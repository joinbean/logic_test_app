<template>
  <section v-if="loaded" class="section quiz-section">
    <div class="content">
      <div class="question-box">
        <img :src="getImg(questions[question]['question']['url'])">
        <div
          class="solution-box"
          @drop="onDrop($event, true)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div
            v-for="image in solution"
            :key="image.id"
            class="image-box"
          >
            <img :src="getImg(image.url)">
          </div>
        </div>
      </div>
      <div class="answer-box">
        <div
          v-for="image in questions[question].images"
          :key="image.id"
          class="image-box"
          draggable
          @dragstart="startDrag($event, image)"
        >
          <img v-if="image.is_answer == false" :src="getImg(image.url)">
        </div>
      </div>
    </div>
    <div v-if="$store.getters.getQuizMax == $store.getters.getQuizCur" class="go-on-button">
      <button @click="quit()">
        Beenden
      </button>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'quiz',
  middleware: 'authenticated',
  data () {
    return {
      image_url: 'http://127.0.0.1:8000/images/',
      questions: '',
      answers: [],
      loaded: false,
      error: false
    }
  },
  computed: {
    question () {
      return this.$store.getters.getQuizCur - 1
    },
    notSolution () {
      return this.questions[this.question].images.filter(item => item.is_answer === false)
    },
    solution () {
      return this.questions[this.question].images.filter(item => item.is_answer === true)
    }
  },
  async mounted () {
    this.$store.commit('setQuizCur', 1)
    this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
    const response = await this.$axios.$get('http://127.0.0.1:8000/api/quiz', null)
    this.nodefy(response.data.questions)
    this.questions = response.data.questions
    this.$store.commit('setQuizMax', this.questions.length)
    this.$store.commit('resetAnswer')
    this.$store.commit('setResultId', response.data.result_id)
    console.log(response.data)
    this.loaded = true
  },
  methods: {
    nodefy (data) {
      data.forEach((element) => {
        element.images.forEach((image, index, object) => {
          if (image.is_question) {
            object.splice(index, 1)
            element.question = image
          } else {
            image.is_answer = false
          }
        })
      })
    },
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },
    onDrop (evt, state) {
      this.questions[this.question].images.forEach(function (item) {
        if (item.id !== parseInt(itemID)) {
          item.is_answer = false
        }
      })
      const itemID = evt.dataTransfer.getData('itemID')
      const item = this.questions[this.question].images.find(x => x.id === parseInt(itemID))
      item.is_answer = state
      this.$store.commit('addResultQuestion', { question: this.questions[this.question].id, answer: item.id })
      console.log(this.$store.getters.getResult)
    },
    getImg (img) {
      return this.image_url + img + '.svg'
    },
    quit () {
      this.$store.commit('commitQuiz')
      this.$store.commit('cancelClockInterval')
      this.$store.commit('logout')
      // this.commiting = true
      // this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
      // const response = await this.$axios.$post('http://127.0.0.1:8000/api/quiz', this.$store.getters.getResult)
      // this.$store.commit('logout')
      // this.$store.commit('cancelClockInterval')
      // console.log(response)
      // this.commiting = false
      // this.$router.push('/finish')
    }
  }
}
</script>
