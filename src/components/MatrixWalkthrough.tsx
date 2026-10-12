import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import { dot, softmax } from '../lib/attention'

const steps = [
  {
    title: '① Query と Key の内積',
    body: 'ベクトルが同じ方向を向くほど内積は大きくなります。これを「関連度」として使います。',
  },
  {
    title: '② 次元数の平方根で割る',
    body: '次元が増えると内積が大きくなりすぎるため、値を適度な範囲へ戻します。',
  },
  {
    title: '③ softmax で割合にする',
    body: '指数関数を使い、すべて正で合計が1になる「重み」へ変換します。',
  },
  {
    title: '④ Value を重み付き平均',
    body: '関連する単語の情報を多く、そうでない情報を少しだけ混ぜ、新しいベクトルを作ります。',
  },
]

const query = [2, 1]
const keys = [[1, 0], [0.5, 0.5], [0, 1]]
const labels = ['私', '猫', '好き']
const rawScores = keys.map((key) => dot(query, key))
const scaledScores = rawScores.map((score) => score / Math.sqrt(2))
const weights = softmax(scaledScores)

export function MatrixWalkthrough() {
  const [step, setStep] = useState(0)
  const formula =
    (step === 0 && String.raw`q\cdot k = \sum_{j=1}^{2}q_jk_j`) ||
    (step === 1 && String.raw`\left[2,\ 1.5,\ 1\right] / \sqrt{2} = \left[${scaledScores.map((n) => n.toFixed(2)).join(',\\ ')}\right]`) ||
    (step === 2 && String.raw`\mathrm{softmax}(s)_i=\frac{e^{s_i}}{\sum_j e^{s_j}}`) ||
    String.raw`z=\sum_i \alpha_i v_i`

  return (
    <div className="matrix-walkthrough">
      <div className="step-tabs" role="tablist" aria-label="Attention計算の手順">
        {steps.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={step === index}
            className={step === index ? 'step-tab active' : 'step-tab'}
            onClick={() => setStep(index)}
            key={item.title}
          >
            <span>0{index + 1}</span>
            {item.title.slice(2)}
          </button>
        ))}
      </div>

      <div className="step-panel" role="tabpanel">
        <div>
          <span className="eyebrow">CALCULATION</span>
          <h3>{steps[step].title}</h3>
          <p>{steps[step].body}</p>
          <div className="formula-card"><BlockMath math={formula} /></div>
        </div>
        <div className="score-visual">
          <div className="query-chip"><small>Query</small><strong>「好き」</strong><code>[2, 1]</code></div>
          <span className="operator">×</span>
          <div className="key-list">
            {labels.map((label, index) => (
              <div className="key-chip" key={label}>
                <span>{label}</span>
                <code>[{keys[index].join(', ')}]</code>
                <strong>
                  {step === 0 && rawScores[index].toFixed(1)}
                  {step === 1 && scaledScores[index].toFixed(2)}
                  {step >= 2 && `${(weights[index] * 100).toFixed(0)}%`}
                </strong>
              </div>
            ))}
          </div>
        </div>
        <div className="step-nav">
          <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>← 戻る</button>
          <span><InlineMath math={`${step + 1}/4`} /></span>
          <button type="button" onClick={() => setStep((value) => Math.min(3, value + 1))} disabled={step === 3}>次へ →</button>
        </div>
      </div>
    </div>
  )
}
