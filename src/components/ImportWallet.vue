<template>
  <div>
    <div class="container has-text-centered">
      <div class="content">
        <h1 class="title is-2">Import Wallet</h1>
        <h1 class="subtitle is-6">Choose your wallet and unlock it to view your balance, make transactions...</h1>
        <b-field>
          <b-upload v-model="droppedFile" drag-drop type="is-white">
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon
                    icon="file_upload"
                    size="is-large">
                  </b-icon>
                </p>
                <p>Drop your wallet here or click and find it</p>
              </div>
            </section>
          </b-upload>
        </b-field>
      </div>
    </div>
    <div v-if="loaded" class="container has-text-centered">

      <div class="content">
        <h1 class="title is-2">Please enter your password</h1>
        <form class="has-text-centered" @submit.prevent="unlockWallet" >
          <b-field position="is-centered" :type="isValidPassword || this.userEntry === '' ? '' : 'is-danger'"
                   :message="passwordMessage">
            <b-input placeholder="Type your wallet password"
                     type="password" v-model="userEntry " password-reveal>
            </b-input>
          </b-field>
          <b-field :message="failMessage">
            <button class="button is-large is-info is-outlined is-inverted"
                    :class="{'is-loading': isLoading}"
                    :disabled="iota === null || !isValidPassword" type="submit">
              Unlock
            </button>
          </b-field>
        </form>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    props: ['iota'],

    data () {
      return {
        isLoading: false,
        userEntry: '',
        droppedFile: [],
        wallet: {},
        failMessage: ''
      }
    },
    watch: {
      droppedFile: function (file) {
        if (file && file.length === 1) {
          let reader = new window.FileReader()
          let self = this;
          reader.onload = function (event) {
            self.wallet = JSON.parse(event.target.result)
          }
          reader.readAsText(file[0])
        }
      }
    },
    computed: {
      loaded () {
        return this.wallet && this.wallet.key && this.wallet.cipher || false
      },
      isValidPassword () {
        return this.userEntry.length > 6
      },
      passwordMessage () {
        return this.isValidPassword || this.userEntry === '' ? '' : 'Password must be longer than 6 chars'
      }
    },
    methods: {
      unlockWallet() {
        this.isLoading = true
        var crypto = require('crypto')

        const key = crypto.pbkdf2Sync(this.userEntry,
          Buffer.from(this.wallet.key.salt, 'hex'),  this.wallet.key.iter,
          this.wallet.key.length,  this.wallet.key.algo);

        const hash = crypto.createHash('sha512')
        hash.update(Buffer.concat([key, Buffer.from(this.wallet.cipher.text, 'hex')]))
        const correct = (this.wallet.uuid === hash.digest('hex'))
        if(correct) {

          const decipher = crypto.createDecipheriv(this.wallet.cipher.algo,
            key, Buffer.from(this.wallet.cipher.iv, 'hex'))
          const seedBuffer = decipher.update(Buffer.from(this.wallet.cipher.text, 'hex'))

          console.log("Deciphered: " + this.bufToSeed(seedBuffer))
          this.isLoading = false
        } else {
          this.failMessage = 'Incorrect password'
          this.userEntry = ''
          this.isLoading = false
        }
      },
      bufToSeed (buffer) {
        let alphabet  = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let seed = ''
        let index = 0;
        let current = 0;
        while(seed.length < 81) {
          current =+ buffer.readUInt8(index)
          while(current >= 27) {
            seed += alphabet[current % 27]
            current = Math.floor(current / 27)
          }
          index++;
        }
        return seed
      }
    }
  }

</script>
