<template>
  <div>
    <router-link to="/other">
      <div class="hero is-primary is-bold"
           :class="$route.name === 'Other' ? 'is-medium' : 'is-small' ">
        <div class="hero-body sizeable">
          <div class="container has-text-centered" v-if="onHome">
            <h1 class="title is-2">Other</h1>
            <h1 class="subtitle is-6">Includes transaction broadcasting, bundle verifying...</h1>
          </div>
        </div>
      </div>
    </router-link>
    <transition name="fade">
      <router-view :iota="iota" :onHome="onHome"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'other-header',
    props: ['iota', 'onHome'],
    data() {
      return {}
    },
    methods: {}
  }
</script>
