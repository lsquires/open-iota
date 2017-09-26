<template>
    <div>
      <transition name="sizechange">
      <search-header v-if="isRoute('Search')" :iota="iota" :onHome="onHome"></search-header>
      </transition>

      <transition name="sizechange">
        <import-header v-if="isRoute('Import')" :iota="iota" :onHome="onHome"></import-header>
      </transition>

      <transition name="sizechange">
          <create-header v-if="isRoute('Create')" :iota="iota" :onHome="onHome"></create-header>
      </transition>
      <!--
      TODO Add explanation of IOTA and guide here
      -->

  </div>
</template>

<script>
  import SearchHeader from '@/components/header/Search'
  import CreateHeader from '@/components/header/CreateWallet'
  import ImportHeader from '@/components/header/ImportWallet'


  export default {
    name: 'home',
    props: ['iota'],
    components: {
      CreateHeader,
      SearchHeader,
      ImportHeader
    },
    computed: {
      onHome () {
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

  .sizechange-enter-active {
    transition: all 0.25s ease;
   }
  .sizechange-leave-active {
    transition: all 0.25s ease;
  }

  .sizechange-enter, .sizechange-leave-to{
    opacity: 0;
    font-size: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  .sizechange-enter .hero-body, .sizechange-leave-to .hero-body{
    padding-bottom: 0 !important;
    padding-top: 0 !important;
  }

</style>
