<template>
    <div>
      <ul v-for="tx in results">
        <li>


          <b-panel collapsible>
            <span slot="header">
              <span class="title is-5">Transaction</span>
              <span class="subtitle is-6">{{ tx.hash | shorten }}</span>
              <span><b-tag type="is-info" style="float: right">Pending...</b-tag></span>
              <br>
              <span class="subtitle is-6">Address: {{ tx.address | shorten }}</span>
            </span>
            <div class="content">
              <h3>
                Details
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br />
                Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
              </p>
            </div>
          </b-panel>

        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'search-tx',
    props: ['iota','results','hash'],
    filters: {
      shorten (str) {
        return str.length > 40 ? str.slice(0,40) + ' . . .' : str
      }
    }
  }
</script>
