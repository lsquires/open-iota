<template>
    <div>
      <div class="hero is-info is-bold"
           :class="$route.name === 'Create' ? 'is-large' : 'is-small' ">
        <div class="hero-body sizeable">
          <div class="container has-text-centered" v-if="onHome">
            <h1 class="title is-2">Create Wallet</h1>
            <div class="container has-text-centered">
              <router-link to="/create-wallet">
                <button class="button is-info is-inverted is-large is-outlined" :disabled="iota === null">Create</button>
              </router-link>

              <transition name="fade">
                <router-view :iota="iota"></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'create-header',
    props: ['iota', 'onHome'],
    data () {
      return {}
    }
  }
</script>
