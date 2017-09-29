<template>
  <div>
    <div v-if="account.view">
      <account-view :seed="account.seed" :iota="iota"></account-view>
    </div>
    <div class="hero is-success is-bold is-small" v-else>
      <div class="hero-body sizeable">
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
          <div v-if="loaded" class="content">
            <h1 class="title is-2">Please enter your password</h1>
            <form class="has-text-centered" @submit.prevent="unlockWallet">
              <b-field position="is-centered" :type="isValidPassword || this.userWalletKey === '' ? '' : 'is-danger'"
                       :message="passwordMessage">
                <b-input placeholder="Type your wallet password"
                         type="password" v-model="userWalletKey " password-reveal>
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
          <hr>
          <h1 class="title has-text-centered is-4">OR</h1>
          <form class="has-text-centered" @submit.prevent="seedGiven(userSeed)">
            <b-field>
              <b-input placeholder="Enter your seed" spellcheck="false"
                       expanded v-model="userSeed">
              </b-input>
            </b-field>
            <b-field :message="isValidSeed || userSeed === '' ? '' : 'Invalid seed'">
              <button class="is-large button is-primary is-outlined is-inverted"
                      :disabled="userSeed === '' || !isValidSeed" type="submit">
                Submit
              </button>
            </b-field>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import AccountView from '@/components/Account'

  export default {
    props: ['iota'],
    components: {
      AccountView
    },
    data() {
      return {
        isLoading: false,
        userWalletKey: '',
        userSeed: '',
        droppedFile: [],
        wallet: {},
        failMessage: '',
        account: {
          seed: '',
          view: false
        }
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
      loaded() {
        return this.wallet && this.wallet.key && this.wallet.cipher || false
      },
      isValidPassword() {
        return this.userWalletKey.length > 6
      },
      passwordMessage() {
        return this.isValidPassword || this.userWalletKey === '' ? '' : 'Password must be longer than 6 chars'
      },
      isValidSeed() {
        return this.iota.valid.isTrytes(this.userSeed) && this.userSeed.length === 81
      }
    },
    methods: {
      seedGiven(seed) {
        this.account.view = true
        this.account.seed = seed
      },
      unlockWallet() {
        this.failMessage = ''
        this.isLoading = true
        var crypto = require('crypto')

        crypto.pbkdf2(this.userWalletKey, Buffer.from(this.wallet.key.salt, 'hex'),
          this.wallet.key.iter, this.wallet.key.length,
          this.wallet.key.algo, (err, key) => {
            if (err) {
              this.isLoading = false;
              this.failMessage = 'Unknown error, check console and report on github'
              this.userWalletKey = ''
              console.log(err)
              return;
            }

            const hash = crypto.createHash(this.wallet.key.checksumAlgo)
            hash.update(Buffer.concat([key, Buffer.from(this.wallet.cipher.text, 'hex')]))
            const correct = (this.wallet.key.checksum === hash.digest('hex'))
            if (correct) {

              const decipher = crypto.createDecipheriv(this.wallet.cipher.algo,
                key, Buffer.from(this.wallet.cipher.iv, 'hex'))
              const seedBuffer = decipher.update(Buffer.from(this.wallet.cipher.text, 'hex'))

              console.log("Deciphered: " + this.bufToSeed(seedBuffer))
              this.seedGiven(this.bufToSeed(seedBuffer))
              this.isLoading = false
            } else {
              this.failMessage = 'Incorrect password'
              this.userWalletKey = ''
              this.isLoading = false
            }
          });
      },
      bufToSeed(buffer) {
        let alphabet = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let seed = ''
        let current = 0;
        for (let i = 0; i < buffer.length && seed.length < 81; i++) {
          current = buffer.readUInt8(i)
          if (current < 243) {
            seed += alphabet[current % 27]
          }
        }
        return seed
      }
    }
  }

</script>
