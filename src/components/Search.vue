<template>
  <div class="container is-loading">
    <div v-if="!isLoading">
      <section class="section">
        <h1 class="title is-4">Results for {{ resultType }}: {{ hash }}</h1>
        <h1 class="subtitle is-5">Found {{ stringNumberOfResults }}</h1>
        <hr>

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
      </section>
    </div>
    <div class="has-text-centered" v-else>
      <div class="button is-large is-white is-loading"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    props: ['iota', 'hash', 'type'],
    data () {
      return {
        resultType: '',
        isLoading: true
      }
    },
    computed: {
      numberOfResults () {
        return this.results ? this.results.length : 0
      },
      stringNumberOfResults () {
        switch(this.numberOfResults) {
          case 0:
            return 'no entries'
          case 1:
            return '1 entry'
          default:
            return `${this.numberOfResults} entries`
        }
      }
    },
    methods: {
      makeQuery (queryObject) {
        if (queryObject.hashes) {
          return new Promise((resolve, reject) => {
            this.iota.api.getTransactionsObjects(queryObject.hashes, (err, res) => {
              this.isLoading = false
              if (err) {
                resolve([{error: 'No transactions found'}])
              }
              resolve(res)
            })
          })
        } else {
          return new Promise((resolve, reject) => {
            this.iota.api.findTransactionObjects(queryObject, (err, res) => {
              this.isLoading = false
              if (err) {
                resolve([{error: 'No transactions found'}])
              }
              resolve(res)
            })
          })
        }
      },
      makeAnyQuery (hash) {
        return new Promise((resolve, reject) => {

          if (hash.length === 27) {

            this.iota.api.findTransactionObjects({tags: [hash]}, (err, res) => {
              this.isLoading = false
              if (err || res.length <= 0 || res[0].hash === '999999999999999999999999999999999999999999999999999999999999999999999999999999999') {
                return resolve([])
              }
              this.resultType = 'tag'
              return resolve(res)
            })

          } else {

            this.iota.api.getTransactionsObjects([hash], (err, res) => {
              if (err || res.length <= 0 || res[0].hash === '999999999999999999999999999999999999999999999999999999999999999999999999999999999') {

                this.iota.api.findTransactionObjects({addresses: [hash]}, (err, res) => {
                  if (err || res.length <= 0 || res[0].hash === '999999999999999999999999999999999999999999999999999999999999999999999999999999999') {

                    this.iota.api.findTransactionObjects({bundles: [hash]}, (err, res) => {
                      this.isLoading = false
                      if (err || res.length <= 0 || res[0].hash === '999999999999999999999999999999999999999999999999999999999999999999999999999999999') {
                        return resolve([])
                      }
                      console.log(res)
                      this.resultType = 'bundle'
                      return resolve(res)
                    })

                  } else {
                    this.isLoading = false
                    this.resultType = 'address'
                    return resolve(res)
                  }
                })

              } else {
                this.isLoading = false
                this.resultType = 'tx'
                return resolve(res)
              }
            })
          }
        })
      }
    },
    asyncComputed: {
      results () {
        this.isLoading = true
        const hash = this.hash
        const type = this.type
        this.resultType = type
        switch (type) {
          case 'tx': {
            return this.makeQuery({hashes: [hash]})
          }
          case 'bundle': {
            return this.makeQuery({bundles: [hash]})
          }
          case 'tag': {
            return this.makeQuery({tags: [hash]})
          }
          case 'address': {
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
