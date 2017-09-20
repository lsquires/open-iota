<template>
  <div>
    <div class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Search</h1>
          <div class="container">
            <div class="has-text-centered">
              <b-field>
                <b-select placeholder="Type" v-model="searchType">
                  <option>Any</option>
                  <option>Tx</option>
                  <option>Address</option>
                  <option>Bundle</option>
                </b-select>
                <b-input placeholder="Hash / Address / Bundle ..."
                         type="search"
                expanded>
                </b-input>
                <p class="control">
                  <button class="button is-success">Search</button>
                </p>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      number: 1,
      number2: 2,
      searchType: 'Any'
    }
  },
  methods: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
