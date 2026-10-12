import { describe, expect, it } from 'vitest'
import { attention, dot, softmax, weightedSum } from './attention'

describe('attention math', () => {
  it('同じ次元のベクトルの内積を計算する', () => {
    expect(dot([1, 2, 3], [4, 5, 6])).toBe(32)
  })

  it('softmaxの合計を1にする', () => {
    const result = softmax([1, 2, 3])
    expect(result.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1)
    expect(result[2]).toBeGreaterThan(result[1])
  })

  it('大きな入力でもsoftmaxを安定して計算する', () => {
    expect(softmax([1000, 1000])).toEqual([0.5, 0.5])
  })

  it('Valueの重み付き平均を計算する', () => {
    expect(weightedSum([0.25, 0.75], [[1, 0], [0, 1]])).toEqual([0.25, 0.75])
  })

  it('scaled dot-product attentionの出力を返す', () => {
    const result = attention([1, 0], [[1, 0], [0, 1]], [[2, 0], [0, 2]])
    expect(result.weights[0]).toBeGreaterThan(result.weights[1])
    expect(result.output[0]).toBeGreaterThan(result.output[1])
  })
})
