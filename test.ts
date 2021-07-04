const isString = (val: unknown): val is string => typeof val === 'string'

function toUpperCase(x: unknown) {
  if (isString(x)) {
    x.toUpperCase()
  }
}