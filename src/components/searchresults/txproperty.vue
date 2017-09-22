<template>
  <div>
    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Hash
        </div>
        <div class="column is-three-quarters field control txvalue">
          <router-link :to="`/search/tx/${tx.hash}`">
          {{tx.hash}}
          </router-link>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Address
        </div>
        <div class="column is-three-quarters field control txvalue">
          <router-link :to="`/search/address/${tx.address}`">
            {{tx.address}}
          </router-link>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Tag
        </div>
        <div class="column is-three-quarters field control txvalue">
          <router-link :to="`/search/tag/${tx.tag}`">
            {{tx.tag}}
          </router-link>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Value
        </div>
        <div class="column is-three-quarters field control txvalue">
          {{tx.value}}
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Timestamp
        </div>
        <div class="column is-three-quarters field control txvalue">
          {{tx.timestamp}}
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Bundle Hash
        </div>
        <div class="column is-three-quarters field control txvalue">
          <router-link :to="`/search/bundle/${tx.bundle}`">
            {{tx.bundle}}
          </router-link>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Nonce
        </div>
        <div class="column is-three-quarters field control txvalue">
          {{tx.nonce}}
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Trunk Hash
        </div>
        <div class="column is-three-quarters field control txvalue">
          <router-link :to="`/search/tx/${tx.trunkTransaction}`">
            {{tx.trunkTransaction}}
          </router-link>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Branch Hash
        </div>
        <div class="column is-three-quarters field control txvalue">
          <router-link :to="`/search/tx/${tx.branchTransaction}`">
            {{tx.branchTransaction}}
          </router-link>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Message
        </div>
        <div class="column is-three-quarters field control txvalue">
          <textarea readonly spellcheck="false" class="textarea"
                    style="white-space: normal; font-size: small; font-family: Monospace; padding: 8px;">
            {{tx.signatureMessageFragment}}
          </textarea>

        </div>
      </div>
    </div>

  </div>
</template>

<


<script>
  import BTableColumn from '../../../node_modules/buefy/src/components/table/TableColumn.vue'

  export default {
    components: {BTableColumn},
    name: 'tx-property',
    props: ['tx']
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
