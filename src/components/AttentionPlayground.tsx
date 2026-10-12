import { useMemo, useState, type CSSProperties } from 'react'
import { InlineMath } from 'react-katex'
import { keys, queries, tokens, values } from '../data/lesson'
import { attention, attentionMatrix } from '../lib/attention'

const format = (value: number) => value.toFixed(2)

export function AttentionPlayground() {
  const [selected, setSelected] = useState(4)
  const matrix = useMemo(() => attentionMatrix(queries, keys), [])
  const result = useMemo(
    () => attention(queries[selected], keys, values),
    [selected],
  )

  return (
    <div className="playground" aria-label="Self-Attention体験">
      <div className="playground-copy">
        <span className="eyebrow">INTERACTIVE 01</span>
        <h3>「誰を見ればよい？」を動かしてみる</h3>
        <p>
          基準にする単語を選んでください。色が濃いほど、その単語を強く参照します。
          ここでは学習済みの <InlineMath math="Q, K, V" /> を小さな3次元ベクトルで再現しています。
        </p>
        <div className="token-picker" role="group" aria-label="基準にする単語">
          {tokens.map((token, index) => (
            <button
              className={selected === index ? 'token active' : 'token'}
              key={token}
              onClick={() => setSelected(index)}
              type="button"
              aria-pressed={selected === index}
            >
              {token}
            </button>
          ))}
        </div>
      </div>

      <div className="attention-stage">
        <div className="query-label">
          Query <strong>{tokens[selected]}</strong> が参照する先
        </div>
        <div className="attention-bars">
          {tokens.map((token, index) => {
            const weight = result.weights[index]
            return (
              <div className="attention-row" key={token}>
                <span>{token}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ '--weight': weight } as CSSProperties}
                  />
                </div>
                <strong>{Math.round(weight * 100)}%</strong>
              </div>
            )
          })}
        </div>
        <div className="vector-result">
          <span>混ぜ合わせた出力ベクトル</span>
          <code>[{result.output.map(format).join(', ')}]</code>
        </div>
      </div>

      <div className="heatmap-wrap">
        <div className="heatmap-title">
          <span>全単語のAttention行列</span>
          <small>行：見る側　列：見られる側</small>
        </div>
        <div
          className="heatmap"
          style={{ '--token-count': tokens.length } as CSSProperties}
        >
          <span />
          {tokens.map((token) => <span className="axis-label" key={`x-${token}`}>{token}</span>)}
          {matrix.map((row, rowIndex) => (
            <div className="heatmap-row" key={`row-${tokens[rowIndex]}`}>
              <button
                className="axis-label row-label"
                type="button"
                onClick={() => setSelected(rowIndex)}
              >
                {tokens[rowIndex]}
              </button>
              {row.map((weight, columnIndex) => (
                <button
                  type="button"
                  className={selected === rowIndex ? 'heat-cell selected' : 'heat-cell'}
                  style={{ '--weight': weight } as CSSProperties}
                  key={`${rowIndex}-${columnIndex}`}
                  onClick={() => setSelected(rowIndex)}
                  aria-label={`${tokens[rowIndex]}から${tokens[columnIndex]}への重み ${Math.round(weight * 100)}%`}
                >
                  {Math.round(weight * 100)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
