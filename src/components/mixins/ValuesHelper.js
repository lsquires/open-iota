module.exports = {
  asyncComputed: {
    priceUSD: {
      get () {
        return this.axios.get('https://min-api.cryptocompare.com/data/price?fsym=IOT&tsyms=USD').
        then(response => response.data.USD)
      },
      default: 0
    }
  },
  methods: {
    toStringValue (value, iota) {
      if(value > 0) {
        return "IN  " + this.toUnits(value, true, iota)
      } else {
        return "OUT " + this.toUnits(-value, true, iota)
      }
    },
    toUnits(val, short, iota) {
      val = Math.abs(val)
      const units = ['i','Ki','Mi','Gi','Ti','Pi']
      const unit = units[Math.floor(((''+val).length - 1) / 3)]
      let num = iota.utils.convertUnits(val, 'i', unit)
      let usd = this.toUSD(val)
      if(short) {
        num = num.toFixed(Math.max(0,3 - (Math.round(num) + '').length))
        usd = usd.toFixed(Math.max(0,3 - (Math.round(usd) + '').length))
      }

      return `${num}${unit} ~$${usd}`
    },
    toUSD(val) {
      return val * this.priceUSD / 1000000
    },
  }
};
