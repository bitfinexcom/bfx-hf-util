'use strict'

module.exports = (f, t) => {
  return `${new Date(f).toLocaleString()} -> ${new Date(t).toLocaleString()}`
}
