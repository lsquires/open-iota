# Open IOTA Wallet Spec

This page is to explain the standard and design structure of the wallet used by open-iota.

The wallet is a simple json object denoting the encrypted seed. The object has these properties

* type: A string denoting the origin program that made the wallet
* version: A string representing the version

* key: Object holding infomation about the key generation (using pbkdf2)
  * key.algo: The algorithm used for key gen
  * key.iter: Number of iterations/rounds of key gen
  * key.salt: The salt for key gen
  * key.length: The length used for key gen
  * key.checksum: The checksum used to tell if the password and therefore key are correct, is defined as the hash of the key and cipher text (encrypted seed)
  * key.checksumAlgo: The hash algo used to generate the checksum

* cipher: Object about the cipher used
  * cipher.text: The output cipher text (encrypted seed)
  * cipher.algo: The algorithm used for encryption
  * cipher.iv: The initialisation vector used for encryption

Once decrypted, the decphiered text will be 256-bytes long, and from this the seed can be calculated via the following:

```
bufToSeed (buffer) {
        let alphabet = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        let seed = ''
        let current = 0
        for (let i = 0; i < buffer.length && seed.length < 81; i++) {
          current = buffer.readUInt8(i)
          if (current < 243) {
            seed += alphabet[current % 27]
          }
        }
        return seed
      }
```

Explained as: Read the unsigned int value of each byte, if it is larger or equal than 243 ignore it, otherwise mod the value by 27 and add that character to the seed with 0='9',1='A',2='B'...

Why not just store the seed? Because then the payload is known to be only [9A-Z] so it is vulnerable 
