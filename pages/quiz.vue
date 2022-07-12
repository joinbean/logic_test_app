<template>
  <section v-if="loaded" class="section quiz-section">
    <div class="content">

      <div class="question-box">
        <img :src="getImg(questions[question]['question']['url'])">
          <draggable
            v-model="solution"
            group="people"
            @start="drag=true"
            @end="drag=false"
            @change="change"
            class="solution-box"
          >
            <div v-for="element in solution" :key="element.id" class="image-box">
              <img :src="getImg(element.url)">
            </div>
          </draggable>
      </div>

      <div>
        <draggable
          v-model="notSolution"
          group="people"
          @start="drag=true"
          @end="drag=false"
          class="answer-box"
        >
          <div v-for="element in notSolution" :key="element.id" class="image-box">
            <img :src="getImg(element.url)">
          </div>
        </draggable>
      </div>

    </div>

    <div class="go-on-button">

      <button v-if="this.$store.getters.getQuizMax == this.$store.getters.getQuizCur" @click="quit()">
        Abschliessen
      </button>

      <button v-else @click="increment()">
        Next
      </button>

    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Events',
  layout: 'new-quiz',
  middleware: 'authenticated',
  components: {
    draggable
  },
  data () {
    return {
      image_url: 'https://twofold.academy/logic/public/images/',
      questions: '',
      loaded: false
    }
  },
  computed: {
    question () {
      return this.$store.getters.getQuizCur - 1
    },
    notSolution: {
      get () {
        return this.questions[this.question].images.filter(item => item.is_answer === false)
      },
      set (val) {}
    },
    solution: {
      get () {
        return this.questions[this.question].images.filter(item => item.is_answer === true)
      },
      set (val) {}
    }
  },
  async mounted () {
    this.$store.commit('setQuizCur', 1)
    this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
    const response = await this.$axios.$get('https://twofold.academy/logic/public/api/quiz', null)
    this.nodefy(response.data.questions)
    this.questions = response.data.questions
    console.log(this.questions)
    this.$store.commit('setQuizMax', this.questions.length)
    this.$store.commit('resetAnswer')
    this.$store.commit('setResultId', response.data.result_id)
    console.log(this.questions[this.question].images)
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
    getImg (img) {
      return this.image_url + img + '.svg'
    },
    quit () {
      this.$store.commit('commitQuiz')
      this.$store.commit('cancelClockInterval')
      this.$store.commit('logout')
    },
    increment () {
      this.$store.commit('increment')
    },
    change (event) {
      if (event.added) {
        if (this.solution.length >= 1) {
          if (event.added.newIndex === 0) {
            this.solution.pop().is_answer = false
          } else {
            this.solution.shift().is_answer = false
          }
        }
        event.added.element.is_answer = true
      }
      if (event.removed) {
        event.removed.element.is_answer = false
      }
    }
  }
}
</script>
