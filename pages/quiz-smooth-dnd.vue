<template>
  <section v-if="loaded" class="section quiz-section">
    <div class="content">

      <div
        v-for="(items, index) in groups"
        :key="index"
        :class="index == 0 ? 'question-box' : ''"
      >
        <img :src="getImg(questions[question]['question']['url'])" v-if="index == 0">
        <Container
          :class="index == 0 ? 'solution-box' : 'answer-box'"
          :data-index="index"
          group-name="column"

          :get-child-payload="itemIndex => getChildPayload(index, itemIndex)"
          :should-accept-drop="(src, payload) => getShouldAcceptDrop(index, src, payload)"
          :should-animate-drop="(src, payload) => getShouldAnimateDrop(index, src, payload)"

          @drag-start="onDragStart"
          @drag-enter="onDragEnter(index)"
          @drag-leave="onDragLeave(index)"
          @drag-end="onDragEnd"
          @drop="onDrop(index, $event)"
        >
          <Draggable v-for="item in items" :key="item.id">
            <div class="image-box">
              <img :src="getImg(item.url)">
            </div>
          </Draggable>
        </Container>
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
import { Container, Draggable } from 'vue-smooth-dnd'
import Vue from 'vue'
// -----------------------------------------------------------------------------------------------------------------
// helpers
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) { return arr }

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return [...new Set(result)]
}

// const generateItems = (count, creator) => {
//   const result = []
//   for (let i = 0; i < count; i++) {
//     result.push(creator(i))
//   }
//   return result
// }

// let i = 0
// function id () {
//   return `item-${++i}`
// }
// function generate (num) {
//   return generateItems(5, i => ({
//     id: id(),
//     data: `Draggable ${num} - ${i + 1}`
//   }))
// }
export default {
  name: 'Events',
  layout: 'quiz',
  middleware: 'authenticated',
  components: {
    Container,
    Draggable
  },
  data () {
    return {
      image_url: 'https://twofold.academy/logic/public/images/',
      questions: '',
      answers: [],
      loaded: false,
      error: false,
      // groups: [],
      flags: [
        { drop: true, animate: false },
        { drop: true, animate: false }
      ],
      logs: {
        'get-child-payload': true,
        'should-accept-drop': false,
        'should-animate-drop': false,
        'drag-start': true,
        'drag-end': true,
        'drag-enter': true,
        'drag-leave': true,
        drop: true
      },
      logPayload: true
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
    },
    groups () {
      console.log(this.solution)
      console.log(this.questions[this.question].images)
      return [
        this.solution,
        this.questions[this.question].images
      ]
    }
  },
  created () {
    // this.groups.push([])
    // this.flags.push({ drop: true, animate: true })
    // this.groups.push(this.questions[this.question].images)
    // this.flags.push({ drop: true, animate: true })
  },
  async mounted () {
    this.$store.commit('setQuizCur', 1)
    this.$axios.setToken(this.$store.getters.getToken, this.$store.getters.getType, ['post', 'get'])
    const response = await this.$axios.$get('https://twofold.academy/logic/public/api/quiz', null)
    this.nodefy(response.data.questions)
    this.questions = response.data.questions
    this.$store.commit('setQuizMax', this.questions.length)
    this.$store.commit('resetAnswer')
    this.$store.commit('setResultId', response.data.result_id)
    console.log(this.questions[this.question].images)
    // this.groups.push([])
    // this.flags.push({ drop: true, animate: true })
    // this.groups.push(this.questions[this.question].images)
    // this.flags.push({ drop: true, animate: true })
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
    // -----------------------------------------------------------------------------------------------------------------
    // callbacks
    getChildPayload (groupIndex, itemIndex) {
      this.log('get-child-payload', groupIndex, itemIndex)
      return this.groups[groupIndex][itemIndex]
    },
    getShouldAcceptDrop (index, sourceContainerOptions, payload) {
      this.log('should-accept-drop', sourceContainerOptions, payload)
      return this.flags[index].drop
    },
    getShouldAnimateDrop (index, sourceContainerOptions, payload) {
      this.log('should-animate-drop', sourceContainerOptions, payload)
      return this.flags[index].animate
    },
    // -----------------------------------------------------------------------------------------------------------------
    // events
    onDragStart (...args) {
      this.log('drag-start', ...args)
    },
    onDragEnd (isSource, payload, willAcceptDrop) {
      this.log('drag-end', isSource, payload, willAcceptDrop)
      if (this.groups[0].length > 0) {
        const id = this.groups[0][0].id
        console.log('now' + id)

        this.groups[1].push(this.groups[0].pop())
      }
    },
    onDragEnter (...args) {
      this.log('drag-enter', ...args)
    },
    onDragLeave (...args) {
      this.log('drag-leave', ...args)
    },
    onDrop (groupIndex, dropResult) {
      // if (this.groups[0].length > 1) {
      //   console.log(this.groups[0].length)
      //   this.groups[1].push(this.groups[0].pop())
      // } else {
      //   console.log(this.groups[0].length)
      // }
      console.log(this.groups[groupIndex])
      console.log(dropResult)
      if (this.groups[1].some(x => x.id === dropResult.payload.id)) {
        const result = applyDrag(this.groups[groupIndex], dropResult)
        Vue.set(this.groups, groupIndex, result)
      }

      const sol = this.groups[0]
      if (sol.length > 0) {
        this.questions[this.question].images.forEach(function (item) {
          console.log(sol[0].id)
          if (item.id !== sol[0].id) {
            item.is_answer = false
          }
        })
        sol[0].is_answer = true
        this.$store.commit('addResultQuestion', { question: this.questions[this.question].id, answer: sol[0].id })
        console.log(this.$store.getters.getResult)
      }

      this.log('drop', dropResult)
    },
    // -----------------------------------------------------------------------------------------------------------------
    // app
    // addColumn () {
    //   const generated = generate(this.groups.length + 1)
    //   console.log(generated)
    //   this.groups.push(generated)
    //   this.flags.push({ drop: true, animate: true })
    // },
    // removeColumn () {
    //   this.groups.pop()
    //   this.flags.pop()
    // },
    log (name, ...args) {
      if (this.logs[name]) {
        this.logPayload
          ? console.log(name, ...args)
          : console.log(name)
      }
    }
  }
}
</script>

<style scoped>
  .controls {
    margin-top: 1em;
  }
  .controls > div {
    padding-top: 1em;
  }
  label {
    display: block;
    line-height: 1.6em;
  }
  .columns {
    display: flex;
    justify-content: stretch;
  }
  .column {
    margin-right: 20px;
    flex: 1;
  }
  .column {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .column .smooth-dnd-container.vertical {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>
