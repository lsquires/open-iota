<template>
    <div>

      <search-header v-if="isRoute('Search')" :iota="iota" :onHome="onHome"></search-header>
      <import-header v-if="isRoute('Import')" :iota="iota" :onHome="onHome"></import-header>
      <create-header v-if="isRoute('Create')" :iota="iota" :onHome="onHome"></create-header>
      <other-header v-if="isRoute('Other')" :iota="iota" :onHome="onHome"></other-header>

      <!--
      TODO Add explanation of IOTA and guide here
      -->

  </div>
</template>

<script>
  import SearchHeader from '@/components/header/Search'
  import OtherHeader from '@/components/header/Other'
  import CreateHeader from '@/components/header/CreateWallet'
  import ImportHeader from '@/components/header/ImportWallet'


  export default {
    name: 'home',
    props: ['iota'],
    components: {
      CreateHeader,
      SearchHeader,
      OtherHeader,
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
</style>
