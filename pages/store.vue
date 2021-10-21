<template>
  <section class="section">
    <h3>
      {{ count }}
    </h3>
    <b-button @click="add">
      add
    </b-button>
    <b-button @click="takes">
      take
    </b-button>
    <b-button @click="getUser">
      log user
    </b-button>
    <b-button @click="setUser">
      setuser
    </b-button>
    <b-input v-model="input" />
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      input: ''
    }
  },
  computed: {
    count () {
      return this.$store.state.counter
    }
  },
  methods: {
    ...mapMutations({
      adds: 'increment',
      takes: 'decrement',
      set: 'setUser'
    }),
    add () {
      this.$store.commit('increment', 10)
    },
    take () {
      this.$store.commit('decrement')
    },
    getUser () {
      console.log(this.$store.getters.getUser)
    },
    setUser () {
      console.log(this.input)
      this.set(this.input)
    }
  }
}
</script>
