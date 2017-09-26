<template>
    <div>
        <div class="hero is-success is-bold"
             :class="$route.name === 'Import' ? 'is-medium' : 'is-small' ">
          <div class="hero-body sizeable">
            <div class="container has-text-centered" v-if="onHome">
              <h1 class="title is-2">Import Wallet</h1>
              <div class="container has-text-centered">
                <router-link to="/import-wallet">
                  <button class="button is-success is-inverted is-large is-outlined" :disabled="iota === null">Import</button>
                </router-link>
              </div>
            </div>
            <transition name="fade">
              <router-view :iota="iota" :onHome="onHome"></router-view>
            </transition>
          </div>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'import-header',
    props: ['iota','onHome'],
    data () {
      return {}
    },
    methods: {

    }
  }
</script>
