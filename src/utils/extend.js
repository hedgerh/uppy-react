module.exports = function extend (...objs) {
  return Object.assign.apply(this, [{}].concat(objs))
}