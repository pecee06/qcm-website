function countOf(elem, array = []) {
  return array.reduce(
    (cummulative, current) => (current == elem ? cummulative + 1 : cummulative),
    0
  )
}

export default countOf
