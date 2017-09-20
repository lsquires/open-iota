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
              <b-icon pack="fa" icon="github"></b-icon>
              <span>Github</span>
            </router-link>
            <div class="navbar-item">
                  <b-dropdown @change="connectToIOTA" v-model="iota.provider" position="is-bottom-left">

                      <button type="button" slot="trigger" class="button" :class="{
                    'is-loading': iota.status === 'Connecting',
                    'is-primary': iota.status === 'Connected',
                    'is-danger': iota.status === 'Failed'}">
                        <span> {{ this.iota.status }} </span>
                        <b-icon icon="arrow_drop_down"></b-icon>
                      </button>

                    <b-dropdown-item custom>
                      Node health: <b>{{ providerHealth }}</b>
                    </b-dropdown-item>
                    <hr class="dropdown-divider">
                    <div v-for="prov in providerList">
                      <b-dropdown-item :value="prov">
                        <div class="media">
                          <b-icon class="media-left" icon="public"></b-icon>
                          <div class="media-content">
                            <h3>{{ prov }}</h3>
                          </div>
                        </div>
                      </b-dropdown-item>
                    </div>
                  </b-dropdown>

            </div>
          </div>
        </div>
      </nav>
    </div>

    <router-view :iota="iota.link"></router-view>

    <footer class="footer">
        <div class="container">
              Built using VueJS + iota.lib.js + buefy
              TODO
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
      providerList: [
        'http://iota.bitfinex.com:80',
        'http://service.iotasupport.com:14265',
        'http://eugene.iota.community:14265',
        'http://eugene.iotasupport.com:14999',
        'http://node01.iotatoken.nl:14265'
      ],
      iota: {
        status: '',
        link: null,
        provider: 'http://iota.bitfinex.com:80',
        connected: false,
        latestMilestoneIndex: 0,
        latestSolidSubtangleMilestoneIndex: 0
      }
    }
  },
  computed: {
    providerHealth () {
      return this.iota.latestSolidSubtangleMilestoneIndex + ' / ' + this.iota.latestMilestoneIndex
    }
  },
  methods: {
    connectToIOTA () {
      this.iota.status = 'Connecting'
      this.iota.connected = false
      this.iota.latestMilestoneIndex = 0
      this.iota.latestSolidSubtangleMilestoneIndex = 0

      this.iota.link = new IOTA({
        provider: this.iota.provider
      })

      this.iota.link.api.getNodeInfo((err, success) => {
        if (err) {
          this.iota.status = 'Failed'
        } else {
          this.iota.status = 'Connected'
          this.iota.connected = true
          this.iota.latestMilestoneIndex = success.latestMilestoneIndex
          this.iota.latestSolidSubtangleMilestoneIndex = success.latestSolidSubtangleMilestoneIndex
        }
      })
    }
  },
  mounted () {
    this.connectToIOTA()
  }
}
</script>

