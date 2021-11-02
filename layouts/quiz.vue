<template>
  <div class="main quiz-page" :class="{'dark-theme': darkMode, 'light-theme': !darkMode}">
    <div class="navbar">
      <div class="breadcrumbs">
        <BreadCrumbs />
      </div>
      <div class="timer">
        <Clock />
      </div>
      <div class="burger">
        <button @click="showModal = !showModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z" fill="#2E3A59" />
          </svg>
        </button>
      </div>
    </div>
    <Nuxt />
    <Modal
      v-show="showModal"
      :theme="darkMode"
      @close="showModal = false"
      @changeTheme="themeSwitch"
      @quit="quit"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showModal: false,
      darkMode: false
    }
  },
  created () {
    this.$nuxt.$on('quit', () => {
      this.quit()
    })
  },
  methods: {
    themeSwitch (value) {
      this.darkMode = value
    },
    quit () {
      console.log(123)
    }
  }
}
</script>
