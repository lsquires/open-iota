<template>
  <div>
    <div class="hero is-primary" :class="$route.name === 'Home' ? 'is-large': 'is-small'">
      <div class="hero-body sizeable">
        <div class="container has-text-centered">
          <h1 class="title is-2">Search</h1>
          <div class="container">
            <form class="has-text-centered">
              <b-field>
                <b-select placeholder="Type" v-model="searchType">
                  <option>Any</option>
                  <option>Tx</option>
                  <option>Address</option>
                  <option>Bundle</option>
                </b-select>
                <b-input placeholder="Hash / Address / Bundle ..."
                         type="search"
                expanded v-model="searchInput">
                </b-input>
                <p class="control">
                  <button class="button is-success" :disabled="iota === null" type="submit" :submit="searchNow" @click="searchNow">Search</button>
                </p>
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

export default {
  name: 'home',
  components: {
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
      this.$router.push({ path: `/search/${this.searchType}/${this.searchInput}` })
    },
    clicked () {
      console.log('clicked')
      this.number = 100
      this.number2 = 101
    }
  },
  asyncComputed: {
    ausername: {
      get () {
        const total = this.number + 1
        return new Promise(resolve =>
          setTimeout(() => resolve(total), 1000)
        )
      }
    }
  }
}
</script>

<style scoped>
.sizeable {
  transition: all ease .25s;
}
</style>
