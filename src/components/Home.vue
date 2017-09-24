<template>
  <div>
    <div class="hero is-primary is-bold" :class="$route.name === 'Home' ? 'is-medium': 'is-small'">
      <div class="hero-body sizeable">
        <div class="container has-text-centered">
          <h1 class="title is-2">Search</h1>
          <div class="container">
            <form class="has-text-centered">
              <b-field position="is-centered" :message="isValidSearch ? '' : 'Invalid address/hash/tag'">
                <b-field :type="isValidSearch ? '' : 'is-danger'">
                  <b-select placeholder="Type" v-model="searchType">
                    <option>Any</option>
                    <option>Tx</option>
                    <option>Address</option>
                    <option>Bundle</option>
                    <option>Tag</option>
                  </b-select>

                  <b-input placeholder="Hash / Address / Bundle / Tag ..." spellcheck="false"
                           expanded type="search" v-model="searchInput">
                  </b-input>


                  <button class="button is-primary is-outlined is-inverted" :disabled="iota === null" type="submit"
                          :submit.prevent="searchNow" @click="searchNow">Search
                  </button>
                </b-field>
              </b-field>
            </form>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="hero is-success is-bold" v-if="$route.name === 'Home'">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title is-2">Import Wallet</h1>
            <div class="container has-text-centered">
              <button class="button is-success is-inverted is-large is-outlined" :disabled="iota === null">Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="hero is-info is-bold" v-if="$route.name === 'Home'">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title is-2">Create Wallet</h1>
            <div class="container has-text-centered">
              <button class="button is-info is-inverted is-large is-outlined" :disabled="iota === null">Create</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <router-view :iota="iota"></router-view>

  </div>
</template>

<script>
  export default {
    name: 'home',
    props: ['iota'],
    data () {
      return {
        searchType: 'Any',
        searchInput: ''
      }
    },
    methods: {
      searchNow () {
        this.$router.push({path: `/search/${this.searchType.toLowerCase()}/${this.searchInput}`})
      }
    },
    computed: {
      isValidSearch () {
        if (!this.searchInput) {
          return true
        }
        switch (this.searchType.toLowerCase()) {
          case 'tx':
            return this.iota.valid.isHash(this.searchInput)
          case 'bundle':
            return this.iota.valid.isHash(this.searchInput)
          case 'address':
            return this.iota.valid.isAddress(this.searchInput)
          case 'tag':
            return this.iota.valid.isTrytes(this.searchInput) && this.searchInput.length <= 27
          case 'any':
            return this.iota.valid.isTrytes(this.searchInput) &&
              (this.searchInput.length <= 27 || this.searchInput.length === 81 || this.searchInput.length === 90)
          default:
            return false
        }
      }
    },
    mounted () {

    },
    beforeRouteUpdate (to, from, next) {
      this.searchInput = ''
      this.searchType =  'Any'
      next()
    }
  }
</script>

<style scoped>
  .sizeable {
    transition: all ease .25s;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0
  }
</style>
