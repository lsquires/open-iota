<template>
  <div>
    <div class="hero is-primary" :class="$route.name === 'Home' ? 'is-large': 'is-small'">
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

                  <b-input placeholder="Hash / Address / Bundle ..."
                  expanded type="search" v-model="searchInput">
                  </b-input>


                  <button class="button is-success" :disabled="iota === null" type="submit" :submit.prevent="searchNow" @click="searchNow">Search</button>
                </b-field>
              </b-field>
            </form>
          </div>
        </div>
      </div>
    </div>

    <router-view :iota="iota"></router-view>

  </div>
</template>

<script>
import Search from '@/components/Search'
import BField from '../../node_modules/buefy/src/components/field/Field.vue'

export default {
  name: 'home',
  components: {
    BField,
    Search
  },
  props: ['iota'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      number: 1,
      number2: 2,
      searchType: 'Any',
      search: false,
      searchInput: ''
    }
  },
  methods: {
    searchNow () {
      this.$router.push({ path: `/search/${this.searchType.toLowerCase()}/${this.searchInput}` })
    }
  },
  computed: {
    isValidSearch () {
      if(!this.searchInput) {
        return true
      }
      switch(this.searchType.toLowerCase()) {
        case "tx":
          return this.iota.valid.isHash(this.searchInput)
        case "bundle":
          return this.iota.valid.isHash(this.searchInput)
        case "address":
          return this.iota.valid.isAddress(this.searchInput)
        case "tag":
          return this.iota.valid.isTrytes(this.searchInput, 27)
        case "any":
          return this.iota.valid.isTrytes(this.searchInput) &&
            (this.searchInput.length === 27 || this.searchInput.length === 81 ||this.searchInput.length === 90)
        default:
          return false
      }
    }
  },
  mounted () {
    this.searchInput = this.$route.params.hash
  }
}
</script>

<style scoped>
.sizeable {
  transition: all ease .25s;
}
</style>
