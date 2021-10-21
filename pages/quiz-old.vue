<template>
  <section v-if="loaded" class="section quiz-section">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <div class="tile" />
            <div class="tile is-parent is-horizontal">
              <article class="tile is-child is-9">
                <div class="content">
                  <p class="title">
                    Pattern
                  </p>
                  <p class="subtitle">
                    Look at this pattern
                  </p>
                  <div class="content">
                    <figure class="image">
                      <img :src="getImg(questions[question]['question']['url'])">
                    </figure>
                  </div>
                </div>
              </article>
              <article class="tile is-child is-3">
                <div class="content">
                  <p class="title">
                    Solution
                  </p>
                  <p class="subtitle">
                    How would it continue
                  </p>
                  <div class="content" />
                </div>
              </article>
            </div>
            <div class="tile" />
          </div>
        </div>
      </div>
      <div class="tile is-vertical is-4">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article v-for="image in questions[question]['columns'][0]" :key="image.id" class="tile is-child notification is-primary">
              <figure class="image is-128x128">
                <img :src="getImg(image.url)">
              </figure>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article v-for="image in questions[question]['columns'][1]" :key="image.id" class="tile is-child notification is-primary">
              <figure class="image is-128x128">
                <img :src="getImg(image.url)">
              </figure>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
    columns () {
      const columns = []
      columns[0] = this.questions[this.question].images.slice(0, 3)
      columns[1] = this.questions[this.question].images.slice(4, 8)
      return columns
    },
    question () {
      return this.$store.getters.getQuizCur - 1
    }
  },
  async mounted () {
    this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
    const response = await this.$axios.$get('http://127.0.0.1:8000/api/quiz', null)
    this.nodefy(response.data.questions)
    this.columnify(response.data.questions)
    this.questions = response.data.questions
    this.$store.commit('setQuizMax', this.questions.length)
    this.loaded = true
  },
  methods: {
    nodefy (data) {
      data.forEach((element) => {
        element.images.forEach((image, index, object) => {
          if (image.is_question) {
            object.splice(index, 1)
            element.question = image
          }
        })
      })
    },
    columnify (data) {
      data.forEach((element) => {
        const columns = []
        columns[0] = element.images.slice(0, 4)
        columns[1] = element.images.slice(4, 8)
        element.columns = columns
      })
    },
    getImg (img) {
      return this.image_url + img + '.gif'
    }
  }
}
</script>
