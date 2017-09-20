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
    asyncComputed: {
      results () {
        this.isLoading = true
        const hash = this.hash
        return new Promise((resolve, reject) => {
          this.iota.api.getTransactionsObjects([hash], (err, res) => {
            this.isLoading = false
            if(err) {
              resolve([{error: "No transactions found"}])
            }
            resolve(res)
          })
        })
      }
    }
  }

</script>
