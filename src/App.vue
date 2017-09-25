<template>
  <div id="app">
    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <router-link :to="{ name: 'Home' }" class="navbar-item">
            <img src="./assets/logo.png" alt="logo" width="28" height="28" style="margin-right: 6px">
            <h1 class="heading title"></h1>
            <h1 class="heading title is-4">Open IOTA</h1>
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
            <a href="https://github.com/lsquires/open-iota" class="navbar-item">
              <span class="icon">
                <b-icon icon="library_books" size="is-small"></b-icon>
              </span>
              <span>Github</span>
            </a>
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
                  <h1 class="title is-6">Latest Milestone:</h1>
                  <b-field class="subtitle">
                    <b-input expanded spellcheck="false" readonly :value="iota.latestMilestone"></b-input>
                    <p class="control">
                      <button class="button is-primary" v-clipboard:copy="iota.latestMilestone">Copy</button>
                    </p>
                  </b-field>
                </b-dropdown-item>
                <b-dropdown-item custom>
                  <h1 class="title is-6">Latest Solid Milestone:</h1>
                  <b-field class="subtitle">
                    <b-input expanded spellcheck="false" readonly :value="iota.latestSolidMilestone"></b-input>
                    <p class="control">
                      <button class="button is-primary" v-clipboard:copy="iota.latestSolidMilestone">Copy</button>
                    </p>
                  </b-field>
                </b-dropdown-item>
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
                <b-dropdown-item custom>
                  <h1 class="title is-6">Custom Provider:</h1>
                  <b-field class="subtitle">
                    <b-input expanded spellcheck="false" v-model.sync="customProvider"></b-input>
                    <p class="control">
                      <button class="button is-primary" @click="addProvider">Add</button>
                    </p>
                  </b-field>
                </b-dropdown-item>
              </b-dropdown>

            </div>
          </div>
        </div>
      </nav>
    </div>

    <router-view :iota="iota.link"></router-view>

    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="heading title is-4">Open IOTA</h1>
            <h1 class="subtitle is-6">Is a free, open-source project to provide a accessible and secure web wallet & explorer for IOTA</h1>
          </div>
          <div class="column">
            Code open source on github, deployed on surge.
            To compile your own version, verify security or host it yourself see the github.
          </div>
          <div class="column">
            <p>Created by Laurence Squires</p>
            <ul>
              <li><a href="mailto:openiota@gmail.com">openiota@gmail.com</a></li>
              <li><a href="https://github.com/lsquires/open-iota">Github</a></li>
            </ul>
          </div>
        </div>
        <h1 class="subtitle is-6">It guarantees security by providing you with the choice to connect to any node you wish, and you can check the source and build this webapp yourself if you desire.</h1>

        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
          <h1 class="title is-5">Donation are always welcome! <3</h1>
          <b-field class="subtitle">
            <b-input expanded spellcheck="false" readonly :value="donationAddress"></b-input>
            <p class="control">
              <button class="button is-primary"  v-clipboard:copy="donationAddress">Copy</button>
            </p>
          </b-field>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import IOTA from 'iota.lib.js'

  export default {
    name: 'app',
    data () {
      return {
        navVisible: false,
        customProvider: '',
        donationAddress: 'ASAHFAIO73FGUI32Y2QRHF23UIHF72FU283YR8HF2987',
        providerList: [
          'http://iota.bitfinex.com:80',
          'http://service.iotasupport.com:14265',
          'http://eugene.iota.community:14265',
          'http://eugene.iotasupport.com:14999',
          'http://node01.iotatoken.nl:14265',
          'http://node02.iotatoken.nl:14265',
          'http://node03.iotatoken.nl:14265',
          'http://mainnet.necropaz.com:14500',
          'http://node.lukaseder.de:14265'
        ],
        iota: {
          status: '',
          link: null,
          provider: 'http://iota.bitfinex.com:80',
          connected: false,
          latestMilestone: '',
          latestSolidMilestone: '',
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
      addProvider () {
        if(this.customProvider) {
          this.providerList.push(this.customProvider)
          this.customProvider = ''
        }
      },
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
            this.iota.latestMilestone = success.latestMilestone
            this.iota.latestSolidMilestone = success.latestSolidSubtangleMilestone
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

