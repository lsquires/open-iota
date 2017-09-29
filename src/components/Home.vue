<template>
  <div>

    <search-header v-if="isRoute('Search')" :iota="iota" :onHome="onHome"></search-header>

    <div v-if="onHome">
    <div class="hero is-success is-bold is-small">
      <div class="hero-body sizeable">
        <div class="container has-text-centered">
          <h1 class="title is-2">Import Wallet</h1>
          <div class="container has-text-centered">
            <router-link to="/import-wallet">
              <button class="button is-success is-inverted is-large is-outlined" :disabled="iota === null">Import
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="hero is-info is-bold is-small">
      <div class="hero-body sizeable">
        <div class="container has-text-centered">
          <h1 class="title is-2">Create Wallet</h1>
          <div class="container has-text-centered">
            <router-link to="/create-wallet">
              <button class="button is-info is-inverted is-large is-outlined" :disabled="iota === null">Create</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>


    <router-link to="/other">
      <div class="hero is-primary is-bold is-small">
        <div class="hero-body sizeable">
          <div class="container has-text-centered">
            <h1 class="title is-2">Other</h1>
            <h1 class="subtitle is-6">Includes transaction broadcasting, bundle verifying...</h1>
          </div>
        </div>
      </div>
    </router-link>
    </div>
    <!--
    TODO Add explanation of IOTA and guide here
    -->

  </div>
</template>

<script>
  import SearchHeader from '@/components/header/Search'


  export default {
    name: 'home',
    props: ['iota'],
    components: {
      SearchHeader
    },
    computed: {
      onHome() {
        return this.$route.name === "Home"
      }
    },
    methods: {
      isRoute(...routes) {
        return this.onHome || routes.some((name) => name === this.$route.name)
      }
    }
  }
</script>

<style>
  .sizeable {
    transition: all ease 0.5s;
  }
</style>
