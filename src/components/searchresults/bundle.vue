<template>
    <div>
      <search-tx :iota="iota" :results="results" :inBundle="true"></search-tx>

      <!--b-panel collapsible :open="!isClosed" has-custom-template>
            <span slot="header">
              <span><b-tag :type="txStatus(index) | toStatusType" style="float: right">{{ txStatus(index) | toStatus
                }}</b-tag></span>
              <span class="title is-5 is-marginless" style="display:inline-block;">Transaction</span>
              <br>
              <span class="subtitle is-6" style="display:inline-block; width: calc(100% - 24px)">{{ tx.hash }}</span>
            </span>
        <tx-property :tx="tx"></tx-property>
      </b-panel-->

    </div>
</template>

<script>
  import SearchTx from './tx'

  export default {
    name: 'search-bundle',
    props: ['iota', 'results','isClosed'],
    components: {
      SearchTx
    },
    computed: {

    }
  }
</script>
