const isArrayIteratable = a => a !== null && a.length !== 0

const object_equals = (x, y) => {
  if (x === y) {
    return true
  }
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false
  }
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) {
    return false
  }
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {
    if (!x.hasOwnProperty(p)) {
      continue
    }
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) {
      return false
    }
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) {
      continue
    }
    // if they have the same strict value or identity then they are equal

    if (typeof x[p] !== 'object') {
      return false
    }
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!object_equals(x[p], y[p])) {
      return false
    }
    // Objects and Arrays must be tested recursively
  }

  for (p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false
    }
  }
  // allows x[ p ] to be set to undefined

  return true
}

const equalChecks = (x, y) => {
  if (!isArrayIteratable(x.checked) || !isArrayIteratable(y.checked)) {
    return x.checked === y.checked
  }
  return (
    x.checked
      .map((xitem, itemIdx) => xitem === y.checked[itemIdx])
      .reduce((i, j) => i && j) && x.checked.length === y.checked.length
  )
}

const equalMeta = (x, y) =>
  x.title === y.title &&
  x.id === y.id &&
  x.created_at === y.created_at &&
  x.description === y.description

const isModelEqual = (a, b) => {
  if (!isArrayIteratable(a) || !isArrayIteratable(b)) {
    return false
  }
  const aSorted = a.sort((x, y) => (x.created_at < y.created_at ? 1 : -1))
  const bSorted = b.sort((x, y) => (x.created_at < y.created_at ? 1 : -1))

  const habitMap = aSorted.map((habitx, idx) => {
    const habity = bSorted[idx]
    return (
      equalMeta(habitx, habity) &&
      equalChecks(habitx, habity) &&
      object_equals(habitx.tags, habity.tags) &&
      object_equals(habitx.cached, habity.cached)
    )
  })

  return habitMap.reduce((i, j) => i && j)
}

export default isModelEqual
