export type Vector = number[]
export type Matrix = number[][]

export const dot = (a: Vector, b: Vector): number => {
  if (a.length !== b.length) {
    throw new Error('内積を計算するベクトルの次元が一致していません')
  }
  return a.reduce((sum, value, index) => sum + value * b[index], 0)
}

export const softmax = (values: Vector): Vector => {
  if (values.length === 0) return []
  const max = Math.max(...values)
  const exponentials = values.map((value) => Math.exp(value - max))
  const denominator = exponentials.reduce((sum, value) => sum + value, 0)
  return exponentials.map((value) => value / denominator)
}

export const weightedSum = (weights: Vector, values: Matrix): Vector => {
  if (weights.length !== values.length || values.length === 0) {
    throw new Error('重みとValueの個数が一致していません')
  }
  const dimension = values[0].length
  if (values.some((value) => value.length !== dimension)) {
    throw new Error('Valueベクトルの次元が一致していません')
  }
  return Array.from({ length: dimension }, (_, column) =>
    values.reduce((sum, value, row) => sum + weights[row] * value[column], 0),
  )
}

export const attention = (
  query: Vector,
  keys: Matrix,
  values: Matrix,
): { scores: Vector; weights: Vector; output: Vector } => {
  if (keys.length === 0 || query.length === 0) {
    throw new Error('QueryとKeyは空にできません')
  }
  const scale = Math.sqrt(query.length)
  const scores = keys.map((key) => dot(query, key) / scale)
  const weights = softmax(scores)
  return { scores, weights, output: weightedSum(weights, values) }
}

export const attentionMatrix = (
  queries: Matrix,
  keys: Matrix,
): Matrix => queries.map((query) => attention(query, keys, keys).weights)
