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
          {{toUnits(tx.value, false, iota)}} ({{tx.value}})
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Timestamp
        </div>
        <div class="column is-three-quarters field control txvalue">
          {{(tx.timestamp * 1000) | moment("MMMM Do YYYY, h:mm:ss a") }} ({{(tx.timestamp * 1000) | moment("from","now") }})
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
          Current / Last Index
        </div>
        <div class="column is-three-quarters field control txvalue">
          {{tx.currentIndex}} / {{tx.lastIndex}}
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

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          ASCII Decoded Message
        </div>
        <div class="column is-three-quarters field control">
          <textarea readonly spellcheck="false" class="textarea"
                    style="white-space: normal; font-size: small; font-family: Monospace; padding: 8px;">
            {{ decodedAsciiFromMessage(iota, tx) }}
          </textarea>
        </div>
      </div>
    </div>

  </div>
</template>



<script>
  import ValueHelper from '../mixins/ValuesHelper';

  export default {
    name: 'tx-property',
    mixins: [ValueHelper],
    props: ['tx', 'iota'],
    methods: {
      decodedAsciiFromMessage: (iota, tx) => {
        let message = tx.signatureMessageFragment
        if (message.length <= 0) {
          return ''
        }
        if (message.length % 2 === 1) {
          message = message.slice(0, -1)
        }
        return iota.utils.fromTrytes(message)
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
    margin-bottom: 0px !important;
  }
</style>
