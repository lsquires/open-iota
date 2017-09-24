<template>
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="panel-content">
          <div class="panel-block txrow">
            <div class="columns">
              <div class="column is-2 content">
                Address
              </div>
              <div class="column field control txvalue">
                <router-link :to="`/search/address/${hash}`">
                  {{hash}}
                </router-link>
              </div>
            </div>
          </div>
          <div class="panel-block txrow">
            <div class="columns">
              <div class="column is-2 content">
                Current Balance
              </div>
              <div class="column field control txvalue">
                {{ balance }}
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="column">
        QR CODE
        </div>
      </div>
      <hr>
      <h1 class="title is-4">
        History
      </h1>
      <h1 v-if="results" class="subtitle is-5">
        Found {{ results.length }} relevant tx{{results.length > 1 ? 's' : '' }}
      </h1>
      <div class="box">
        <search-tx :iota="iota" :results="results" :isCollapsed="true"></search-tx>
      </div>
    </div>
</template>

<script>
  import SearchTx from '@/components/searchresults/tx'
  import SearchBundle from '@/components/searchresults/bundle'
  import ValueHelper from '../mixins/ValuesHelper';

  export default {
    name: 'search-address',
    mixins: [ValueHelper],
    components: {
      SearchTx,
      SearchBundle
    },
    props: ['iota', 'results', 'hash'],
    mounted () {
    },
    computed: {
      balance () {
        return (this.balances && this.balances.length) > 0 ?
          this.toUnits(this.balances[0],  false, this.iota) : 'Calculating...'
      }
    },
    asyncComputed: {
      balances: {
        lazy: true,
          get () {
          return new Promise((resolve, reject) => {
            this.iota.api.getBalances([this.hash], 100, (err, res) => {
              if (err) {
                return resolve([])
              }
              return resolve(res.balances)
            })
          })
        },
        default: []
      }
    }
  }
</script>



<style scoped>
  .txvalue {
    word-break: break-all;
    overflow-wrap: break-word;
  }

  .txrow {
    display: block;
  }

  .column {
    margin-bottom: 0px;
  }
</style>
