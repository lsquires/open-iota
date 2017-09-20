<template>
  <div id="app">
    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <router-link :to="{ name: 'Home' }" class="navbar-item">
            <img src="./assets/logo.png" alt="logo" width="112" height="28">
          </router-link>
          <div class="navbar-burger" v-bind:class="{ 'is-active': navVisible }" @click="navVisible = !navVisible">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active': navVisible }">
          <div class="navbar-start">

          </div>
          <div class="navbar-end">
            <router-link to="/github" class="navbar-item">
              Github
            </router-link>
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <button class="button">
                    Connection
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <router-view :iota="iota.link"></router-view>

    <footer class="section hero is-dark">
      <div class="container">
        <div class="columns has-text-centered">
          <div class="column">
            Built using VueJS + iota.lib.js + buefy
            TODO
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      navVisible: false,
      iota: {
        link: null,
        connected: false
      }
    }
  }
}
</script>

