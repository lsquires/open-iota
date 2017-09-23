module.exports = {
  methods: {
    toStringValue (value, iota) {
      if(value > 0) {
        return "IN  " + this.toUnits(value, true, iota)
      } else {
        return "OUT " + this.toUnits(-value, true, iota)
      }
    },
    toUnits(val, short, iota) {
      const units = ['i','Ki','Mi','Gi','Ti','Pi']

      const unit = units[Math.floor(((''+val).length - 1) / 3)]
      let num = iota.utils.convertUnits(val, 'i', unit)
      if(short) {
        num = num.toFixed(3 - (Math.round(num) + '').length)
      }
      return `${num}${unit} ~$${this.toUSD(val)}`
    },
    toUSD(val) {
      return 5
    },
  }
};
