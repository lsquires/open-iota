<template>
  <div>
    <div class="panel-block" v-for="row in tableData">

      <p>{{row.name}}</p>
      <p >{{row.value}}</p>

    </div>
  </div>
</template>

<script>
  import BTableColumn from '../../../node_modules/buefy/src/components/table/TableColumn.vue'

  export default {
    components: {BTableColumn},
    name: 'tx-property',
    props: ['tx'],
    computed: {
      tableData () {
        return Object.keys(this.tx).map((key) => {return {
          name: key,
          value: this.tx[key]
        }})
      }
    }
  }
</script>
