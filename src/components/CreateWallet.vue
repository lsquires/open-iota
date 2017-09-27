<template>
  <div>
    <div class="container has-text-centered">
      <div class="content">
        <h1 class="title is-2">Create New Wallet</h1>
        <h1 class="subtitle is-6">This will generate a random seed and encrypt it using your password into a wallet.</h1>
        <form class="has-text-centered" @submit.prevent="createWallet">
            <b-field position="is-centered" :type="isValidPassword || this.userEntry === '' ? '' : 'is-danger'"
                     :message="isValidPassword || this.userEntry === '' ? '' : 'Password must be longer than 6 chars'">
              <b-input placeholder="Type a strong password and REMEMBER IT"
                       type="password" v-model="userEntry " password-reveal>
              </b-input>
            </b-field>
            <b-field>
              <button class="button is-large is-info is-outlined is-inverted"
                      :class="{'is-loading': isLoading}"
                      :disabled="iota === null || !isValidPassword" type="submit">
                Generate
              </button>
            </b-field>
        </form>
      </div>
    </div>
    <div v-if="generated" class="container has-text-centered">
      <div class="content">
        <p>Done!</p>
        <p>Your wallet has now been generated, please remember to back it up. </p>
        <p>If you lose the wallet or your password then your seed will not be recoverable.</p>

        <a :href="downloadBlob" :download="downloadFilename">
          <button class="button is-large is-info is-outlined is-inverted">
          Download
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['iota'],

    data () {
      return {
        generated: false,
        isLoading: false,
        userEntry: '',
        wallet: {
          key : {},
          cipher: {}
        }
      }
    },
    mounted () {
      console.log(crypto)
    },
    computed: {
      isValidPassword () {
        return this.userEntry.length > 6
      },
      downloadBlob () {
        let blob = new Blob([JSON.stringify(this.wallet)], {type: "text/plain;charset=utf-8"})
        return window.URL.createObjectURL(blob);
      },
      downloadFilename () {
        return `IOTA-WALLET-${(new Date ()).toJSON()}.keystore`
      }
    },
    methods: {
      createWallet () {
        this.isLoading = true
        var crypto = require('crypto')

        const seedBuffer = crypto.randomBytes(128);

        const keylength = 32
        const keySalt = crypto.randomBytes(128);
        const keyGenAlgo = 'sha512'
        const keyIterations = 262144
        crypto.pbkdf2(this.userEntry,
          keySalt, keyIterations, keylength,
          keyGenAlgo, (err, key) => {

          if(err) {
            this.isLoading = false;
            console.log(err)
            return;
          }
          const cipherAlgo = 'aes-256-ctr'
          const cipherIV =  crypto.randomBytes(16);
          const cipher = crypto.createCipheriv(cipherAlgo, key, cipherIV)
          const cipherText = cipher.update(seedBuffer)

          this.wallet.key.algo = keyGenAlgo
          this.wallet.key.iter = keyIterations
          this.wallet.key.salt = keySalt.toString('hex')
          this.wallet.key.length = keylength

          this.wallet.cipher.text = cipherText.toString('hex')
          this.wallet.cipher.algo = cipherAlgo
          this.wallet.cipher.iv = cipherIV.toString('hex')

          this.wallet.type = 'OPEN IOTA'
          this.wallet.version = 1

          const hash = crypto.createHash('sha512')
          hash.update(Buffer.concat([ key, cipherText ]))
          this.wallet.uuid = hash.digest('hex')

          console.log(seedBuffer.toString('hex'))
          console.log("Before: "+this.bufToSeed(seedBuffer))
          console.log(this.wallet)

          this.generated = true;
          this.userEntry = ''
          this.isLoading = false
          });
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
