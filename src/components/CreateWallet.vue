<template>
  <div>
    <div class="container has-text-centered">
      <div class="content">
      <h1 class="title is-2">Create New Wallet</h1>
        <form class="has-text-centered" @submit.prevent="createWallet">
            <b-field position="is-centered" :type="isValidPassword || this.userEntry === '' ? '' : 'is-danger'"
                     :message="isValidPassword || this.userEntry === '' ? '' : 'Password must be longer than 6 chars'">
              <b-input placeholder="Type a strong password and REMEMBER IT"
                       type="password" v-model="userEntry " password-reveal>
              </b-input>
            </b-field>
            <b-field>
              <button class="button is-large is-info is-outlined is-inverted"
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
      }
    },
    methods: {
      createWallet () {

        var crypto = require('crypto')

        const seedBuffer = crypto.randomBytes(128);

        const keylength = 32
        const keySalt = crypto.randomBytes(128);
        const keyGenAlgo = 'sha512'
        const keyIterations = 20000
        const key = crypto.pbkdf2Sync(this.userEntry, keySalt, keyIterations, keylength, keyGenAlgo);

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
        this.wallet.uuid = crypto.randomBytes(32).toString('hex')

        console.log(seedBuffer.toString('hex'))
        console.log("Before: "+this.bufToSeed(seedBuffer))
        console.log(this.wallet)
        this.walletToSeed(this.wallet,this.userEntry)
        this.generated = true;
        this.userEntry = ''
      },
      walletToSeed(wallet, password) {
        var crypto = require('crypto')

        const key = crypto.pbkdf2Sync(password,
          Buffer.from(wallet.key.salt, 'hex'),  wallet.key.iter,
          wallet.key.length,  wallet.key.algo);

        const decipher = crypto.createDecipheriv(wallet.cipher.algo,
          key, Buffer.from(wallet.cipher.iv, 'hex'))
        const seedBuffer = decipher.update(Buffer.from(wallet.cipher.text, 'hex'))

        console.log(seedBuffer.toString('hex'))
        console.log("Deciphered: "+this.bufToSeed(seedBuffer))
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
