const p = (...args) => {
  args.length > 0 ? console.log(...args) : console.log('')
  return args.length == 0 ? undefined : args.length == 1 ? args[0] : args
}
Object.defineProperty(Object.prototype, 'p', {
  get() {
    p(this.valueOf())
    return this.valueOf()
  },
})
