<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>Wirklich beenden?</h3>
            </slot>
          </div>

          <div class="modal-body" >
            <slot name="body">
              <div class="btn-solo" v-show="showQuit">
                <button @click="quit()">
                  Ja
                </button>
                <button @click="$emit('close')">
                  Nein
                </button>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    showQuit () {
      return this.$nuxt.$route.path === '/quiz'
    }
  },
  methods: {
    quit () {
      this.$store.commit('commitQuiz')
      this.$store.commit('cancelClockInterval')
      this.$store.commit('logout')
    }
  }
}
</script>
