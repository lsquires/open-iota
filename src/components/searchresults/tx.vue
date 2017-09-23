<template>
  <div>
    <ul v-for="(tx, index) in results">
      <li>
        <b-panel collapsible :open="!inBundle && !isCollapsed" has-custom-template>
            <span slot="header">
              <span>
                 <b-taglist attached style="float: right">
                   <b-tag v-if="isValueTransfer(tx)" :type="valueType(tx)" style="float: right">{{ toStringValue(tx.value, iota)}}</b-tag>
                   <b-tag :type="txStatus(index) | toStatusType" style="float: right">{{ txStatus(index) | toStatus}}</b-tag>
                 </b-taglist>
              </span>
              <span class="title is-5 is-marginless" style="display:inline-block;">Transaction {{ bundleStatus(tx) }}</span>
              <br>
              <span class="subtitle is-6" style="display:inline-block; width: calc(100% - 24px)">{{ tx.hash }}</span>
            </span>
          <tx-property :tx="tx"></tx-property>
        </b-panel>
      </li>
    </ul>
  </div>
</template>

<script>

  import TxProperty from './txproperty.vue'
  import ValueHelper from '../mixins/ValuesHelper';

  export default {
    components: {TxProperty},
    name: 'search-tx',
    mixins: [ValueHelper],
    props: ['iota', 'results', 'overallStatus', 'inBundle', 'isCollapsed'],
    filters: {
      shorten (str) {
        return str.length > 40 ? str.slice(0, 40) + ' . . .' : str
      },
      toStatus (tx) {
        if (typeof tx === 'undefined') {
          return 'Unknown'
        } else {
          return tx ? 'Confirmed' : 'Pending'
        }
      },
      toStatusType (tx) {
        if (typeof tx === 'undefined') {
          return 'is-warning'
        } else {
          return tx ? 'is-success' : 'is-info'
        }
      }
    },
    methods: {
      isValueTransfer (tx) {
        return tx.value !== 0
      },
      valueType(tx) {
        return tx.value > 0 ? 'is-success' : 'is-danger'
      },
      txStatus (index) {
        if (this.inBundle) {
          return this.overallStatus
        } else {
          return this.asyncTxStatus[index]
        }
      },
      bundleStatus (tx) {
        return tx.lastIndex === 0 ? '' : `(${tx.currentIndex + 1}/${tx.lastIndex + 1})`
      }
    },
    asyncComputed: {
      asyncTxStatus: {
        lazy: true,
        get () {
          console.log('get')
          return new Promise((resolve, reject) => {
            this.iota.api.getLatestInclusion(this.results.map((a) => a.hash), (err, res) => {
              if (err) {
                return resolve([])
              }
              return resolve(res)
            })
          })
        },
        default: []
      }
    }
  }
</script>

<style scoped>
  .tag {
    font-size: 0.9rem;
  }
</style>
