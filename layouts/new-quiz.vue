<template>
  <div class="main quiz-page" :class="{'dark-theme': darkMode, 'light-theme': !darkMode}">
    <div class="navbar">
      <div class="breadcrumbs">
        <BreadCrumbs />
      </div>
      <div class="timer">
        <Clock />
      </div>
      <div class="btn-group">
        <button @click="changeTheme(false)">
          <div class="btn-rect" :class="{ active: !darkMode }">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.998 22H10.998V19H12.998V22ZM18.362 19.778L16.241 17.657L17.655 16.243L19.777 18.365L18.364 19.778H18.362ZM5.63405 19.778L4.21905 18.364L6.33905 16.242L7.75405 17.656L5.63405 19.777V19.778ZM11.998 17.007C9.23302 17.0059 6.99231 14.7637 6.99305 11.9987C6.99378 9.23364 9.23568 6.99263 12.0007 6.993C14.7657 6.99337 17.007 9.23497 17.007 12C17.0043 14.7649 14.763 17.0053 11.998 17.007ZM11.998 8.993C10.3376 8.9941 8.99231 10.3409 8.99305 12.0013C8.99378 13.6618 10.3403 15.0074 12.0007 15.007C13.6612 15.0066 15.007 13.6605 15.007 12C15.0054 10.3392 13.6589 8.99355 11.998 8.993ZM21.998 13H18.998V11H21.998V13ZM4.99805 13H1.99805V11H4.99805V13ZM17.654 7.758L16.241 6.343L18.362 4.221L19.777 5.636L17.655 7.757L17.654 7.758ZM6.34105 7.758L4.22105 5.637L5.63605 4.223L7.75605 6.345L6.34205 7.757L6.34105 7.758ZM12.998 5H10.998V2H12.998V5Z" fill="#2E3A59" />
            </svg>
          </div>
        </button>
        <button @click="changeTheme(true)">
          <div class="btn-rect" :class="{ active: darkMode }">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.248 16.9972C18.1656 16.9991 18.0829 17 18 17C11.9249 17 7 12.0751 7 5.99999C7 5.91709 7.00092 5.8344 7.00275 5.75192C5.17211 7.21851 4 9.47339 4 12C4 16.4182 7.58172 20 12 20C14.5266 20 16.7814 18.8279 18.248 16.9972ZM19.4661 14.8812C18.989 14.9593 18.4992 15 18 15C13.0294 15 9 10.9706 9 5.99999C9 5.50074 9.04065 5.01099 9.11882 4.53386C9.25094 3.72745 9.49024 2.9571 9.82162 2.23792C8.96026 2.42928 8.14073 2.73173 7.37882 3.12946C4.18215 4.79821 2 8.14425 2 12C2 17.5228 6.47715 22 12 22C15.8557 22 19.2017 19.8178 20.8705 16.6212C21.2682 15.8593 21.5707 15.0397 21.762 14.1784C21.0429 14.5098 20.2725 14.7491 19.4661 14.8812Z" fill="#2E3A59" />
            </svg>
          </div>
        </button>
      </div>
      <div class="burger">
        <button @click="showModal = !showModal">
          <svg
            version="1.1"
            id="closer"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 460.775 460.775"
            style="enable-background:new 0 0 460.775 460.775;"
            xml:space="preserve">
            <path
              d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
              c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
              c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
              c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
              l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
              c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
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
