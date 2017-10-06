<template>
  <div>
    <div class="hero is-primary is-bold is-small">
      <div class="hero-body sizeable">
        <div class="container has-text-centered">
          <h1 class="title is-2">Your account</h1>
        </div>
      </div>
    </div>

    <div>
      <div class="container">
        <div class="box" v-for="(item, index) in accounts" :key="item">
          Address: {{ item }}
          <hr>
          <search-tx :iota="iota" :results="results[index]" :isCollapsed="true"></search-tx>
        </div>
      </div>

      <!--b-tabs v-model="activeTab" position="is-centered">
        <b-tab-item label="Overview">
          <div class="container">
            <div class="media">
              <div class="media-left">
                QR CODE
              </div>
              <div class="media-content">
                Table of info
              </div>
            </div>
            <div class="columns">
              <div class="column">
                Info graphic showing last addresses

                Option to rescan
              </div>
              <div class="column">
                Spammer maybe?
              </div>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="History">
          Lorem <br>
          ipsum <br>
          dolor <br>
          sit <br>
          amet.
        </b-tab-item>

        <b-tab-item label="Make Transaction">
          TODO
        </b-tab-item>
      </b-tabs-->
    </div>

  </div>
</template>

<script>
  import SearchTx from '@/components/searchresults/tx'

  export default {
    name: 'account-view',
    props: ['iota','seed'],
    components: {
      SearchTx
    },
    data () {
      return {
        activeTab: 0,
        accounts: [],
        results: [],
        securityLevel: 3,
        totalAddressesToCheck: 2
      }
    },
    asyncComputed: {
      accountResults: {
        get () {
          return new Promise((resolve, reject) => {
            const addresses = this.addresses
            this.iota.api.findTransactionObjects({addresses}, (err, res) => {
              if (err) {
                return resolve([])
              }
              let sorted = {}
              for(let i = 0; i < res.length; i++) {
                if(sorted[res[i].address]) {
                  sorted[res[i].address].push(res[i])
                } else {
                  sorted[res[i].address] = [res[i]]
                }
              }
              return resolve(sorted)
            })
          })
        },
        default: []
      }
    },
    methods: {
      generateAddresses (toGenerate) {
        if(toGenerate) {
          if(toGenerate > 0) {
            let settings = {
              index: this.accounts.length,
              checksum: true,
              total: toGenerate,
              security: this.securityLevel
            }
            this.iota.api.getNewAddress(this.seed, settings, (err, res) => {
              console.log(res)
              console.log(err)
              if (err) {
                return
              }
              const acclength = this.accounts.length
              for(let i = 0; i < toGenerate; i++) {
                this.iota.api.findTransactionObjects({addresses: [res[i]]}, (err, res) => {
                  this.results[acclength + i] = res
                })
              }
              this.accounts.push(res)
            })
          } else {
            //TODOS
          }
        } else {
          //Start from zero
          let settings = {index: 0,
            checksum: true,
            total: this.totalAddressesToCheck,
            security: this.securityLevel}
          this.iota.api.getNewAddress(this.seed, settings, (err, res) => {
            console.log(res)
            console.log(err)
            if (err) {
              return
            }
            this.results = []
            for(let i = 0; i < res.length; i++) {
              this.iota.api.findTransactionObjects({addresses: [res[i]]}, (err, res) => {
                this.results[i] = res
              })
            }
            this.accounts = res
          })
        }
      }
    },
    mounted () {
      console.log('mounted')

      this.generateAddresses()
    },
    watch: {
      securityLevel () {
        this.generateAddresses()
      },
      totalAddressesToCheck (newValue) {
        this.generateAddresses(newValue - this.accounts.length)
      }
    }

  }
</script>
