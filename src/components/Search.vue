<template>
    <div class="container is-loading">
      <div v-if="!isLoading">
        <div v-for="tx in results">
          <div v-if="tx.error">
            {{ tx.error }}
          </div>
          <div v-else>
            Hash: {{tx.hash}}
            Branch: {{tx.branchTransaction}}
            Address: {{tx.address}}
            Nonce: {{tx.nonce}}
            Tag: {{tx.tag}}
          </div>
        </div>
      </div>
      <div class="has-text-centered" v-else>
        <div class="button is-large is-white is-loading"></div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'search',
    props: ['iota','hash','type'],
    data () {
      return {
        isLoading: true
      }
    },
    methods: {
      makeQuery(queryObject) {
        if(queryObject.hashes) {
          return new Promise((resolve, reject) => {
            this.iota.api.getTransactionsObjects(queryObject.hashes, (err, res) => {
              this.isLoading = false
              if (err) {
                resolve([{error: "No transactions found"}])
              }
              resolve(res)
            })
          })
        } else {
          return new Promise((resolve, reject) => {
            this.iota.api.findTransactionObjects(queryObject, (err, res) => {
              this.isLoading = false
              if (err) {
                resolve([{error: "No transactions found"}])
              }
              resolve(res)
            })
          })
        }
      },
      makeAnyQuery(hash) {
          return new Promise((resolve, reject) => {
            this.iota.api.getTransactionsObjects([hash], (err, res) => {
              if(err || res.length < 0 || res[0].hash === "999999999999999999999999999999999999999999999999999999999999999999999999999999999") {
                if(hash.length === 27)  {
                  this.iota.api.findTransactionObjects({tags: [hash]}, (err, res) => {
                    this.isLoading = false
                    if (err) {
                      console.log(err)
                      resolve([{error: "No transactions found"}])
                    }
                    resolve(res)
                  })
                } else {
                  this.iota.api.findTransactionObjects({bundles: [hash],addresses: [hash]}, (err, res) => {
                    this.isLoading = false
                    if (err) {
                      console.log(err)
                      resolve([{error: "No transactions found"}])
                    }
                    resolve(res)
                  })
                }
              } else {
                this.isLoading = false
                resolve(res)
              }
            })
          })
      }
    },
    asyncComputed: {
      results () {
        this.isLoading = true
        const hash = this.hash
        const type = this.type
        switch(type) {
          case "tx": {
            return this.makeQuery({hashes: [hash]})
          }
          case "bundle": {
            return this.makeQuery({bundles: [hash]})
          }
          case "tag": {
            return this.makeQuery({tags: [hash]})
          }
          case "address": {
            return this.makeQuery({addresses: [hash]})
          }
          default: {
            return this.makeAnyQuery(hash)
          }
        }
      }
    }
  }

</script>
