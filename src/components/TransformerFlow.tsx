import { useState } from 'react'
import { BlockMath } from 'react-katex'
import { flowSteps } from '../data/lesson'

export function TransformerFlow() {
  const [selected, setSelected] = useState(2)
  const current = flowSteps[selected]

  return (
    <div className="flow-explorer">
      <div className="flow-diagram" aria-label="Transformerの処理順序">
        <div className="flow-input">「猫が好き」</div>
        <span className="flow-arrow">↓</span>
        {flowSteps.map((step, index) => (
          <div className="flow-item" key={step.id}>
            <button
              type="button"
              className={selected === index ? 'flow-block active' : 'flow-block'}
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
            >
              <small>STEP {index + 1}</small>
              <strong>{step.short}</strong>
            </button>
            {index < flowSteps.length - 1 && <span className="flow-arrow">↓</span>}
          </div>
        ))}
        <span className="flow-arrow">↓</span>
        <div className="flow-output">次の単語の確率</div>
      </div>
      <div className="flow-detail" key={current.id}>
        <span className="eyebrow">STEP {selected + 1} / {flowSteps.length}</span>
        <h3>{current.label}</h3>
        <p>{current.description}</p>
        <div className="formula-card"><BlockMath math={current.math} /></div>
        <div className="analogy">
          <span>数学III・Cとの接点</span>
          <strong>
            {selected === 0 && 'ベクトル空間・座標'}
            {selected === 1 && '三角関数・ベクトルの和'}
            {selected === 2 && '内積・行列・指数関数'}
            {selected === 3 && '平均・標準偏差'}
            {selected === 4 && '一次変換・合成関数'}
          </strong>
        </div>
      </div>
    </div>
  )
}
