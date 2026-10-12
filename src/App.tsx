import { useEffect, useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import { AttentionPlayground } from './components/AttentionPlayground'
import { MatrixWalkthrough } from './components/MatrixWalkthrough'
import { TransformerFlow } from './components/TransformerFlow'
import './styles.css'

function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="site-shell">
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Transformerをほどく トップへ">
          <span className="brand-mark">T</span>
          <span>Transformerをほどく</span>
        </a>
        <nav aria-label="メインナビゲーション">
          <a href="#foundation">数学の準備</a>
          <a href="#attention">Attention</a>
          <a href="#architecture">全体像</a>
        </nav>
        <a className="header-cta" href="#attention">体験する <span>↘</span></a>
      </header>

      <main>
        <section className="hero-section" id="top">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-content">
            <div className="hero-kicker"><span>数学III・C</span> からはじめるAIのしくみ</div>
            <h1>
              Transformerを、<br />
              <em>数式の意味</em>から理解する。
            </h1>
            <p className="hero-lead">
              難しそうなAIも、使っているのはベクトル、行列、指数関数。
              高校数学を足場に、言葉が「わかる」までを一歩ずつ追いかけます。
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#foundation">学びはじめる <span>↓</span></a>
              <span className="reading-time">全7章・約20分</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="単語同士のつながりを表す図">
            <svg viewBox="0 0 560 430" role="img">
              <defs>
                <linearGradient id="lineGlow" x1="0" x2="1">
                  <stop offset="0" stopColor="#6ee7d2" stopOpacity=".15" />
                  <stop offset=".5" stopColor="#6ee7d2" stopOpacity=".9" />
                  <stop offset="1" stopColor="#ffb36b" stopOpacity=".2" />
                </linearGradient>
              </defs>
              <g className="connections">
                <path d="M110 90 Q280 30 455 110" />
                <path d="M110 90 Q250 210 430 310" />
                <path d="M170 330 Q270 100 455 110" />
                <path d="M170 330 Q310 380 430 310" />
                <path d="M110 90 Q300 190 430 310" />
                <path className="strong" d="M455 110 Q270 220 170 330" />
              </g>
              <g className="node node-a"><circle cx="110" cy="90" r="52" /><text x="110" y="96">言葉</text></g>
              <g className="node node-b"><circle cx="455" cy="110" r="63" /><text x="455" y="116">意味</text></g>
              <g className="node node-c"><circle cx="170" cy="330" r="62" /><text x="170" y="336">文脈</text></g>
              <g className="node node-d"><circle cx="430" cy="310" r="48" /><text x="430" y="316">予測</text></g>
              <g className="pulse-dot"><circle cx="280" cy="205" r="8" /></g>
            </svg>
            <div className="visual-caption"><span>Attention</span> 言葉どうしの関係を測る</div>
          </div>
          <div className="scroll-hint"><span>SCROLL TO EXPLORE</span><i /></div>
        </section>

        <section className="intro-strip">
          <p>このページでわかること</p>
          <div>
            <span><b>01</b> 言葉をどう数にする？</span>
            <span><b>02</b> 文脈をどう見つける？</span>
            <span><b>03</b> 文章をどう生成する？</span>
          </div>
        </section>

        <section className="lesson-section foundation" id="foundation">
          <div className="section-heading">
            <div>
              <span className="chapter">CHAPTER 01 — 数学の準備 1</span>
              <h2>まず、言葉を<br /><em>ベクトル</em>にする。</h2>
            </div>
            <p>
              コンピューターは言葉をそのまま扱えません。そこで、単語を数字の並びに置き換えます。
              数学Cで学ぶベクトルと同じです。
            </p>
          </div>

          <div className="concept-grid">
            <article className="concept-card vector-card">
              <span className="card-number">01 — VECTOR</span>
              <h3>意味を「座標」で表す</h3>
              <p>方向が似ているベクトルは、意味も似ていると考えます。</p>
              <div className="coordinate-plane" aria-label="単語ベクトルの座標平面">
                <span className="axis x-axis" />
                <span className="axis y-axis" />
                <span className="vector v-cat"><i />猫</span>
                <span className="vector v-dog"><i />犬</span>
                <span className="vector v-car"><i />車</span>
                <span className="plane-label label-y">生き物らしさ</span>
                <span className="plane-label label-x">身近さ</span>
              </div>
              <div className="math-note">
                <InlineMath math={String.raw`\vec{x}_{猫}=(0.8,\ 0.9,\ \ldots)`} />
              </div>
            </article>

            <article className="concept-card matrix-card">
              <span className="card-number">02 — MATRIX</span>
              <h3>変換を「行列」で表す</h3>
              <p>ベクトルに行列を掛けると、見たい特徴に合わせて座標を変換できます。</p>
              <div className="matrix-demo">
                <div className="mini-matrix"><span>0.8</span><span>0.2</span><span>0.1</span><span>0.9</span></div>
                <b>×</b>
                <div className="mini-vector"><span>0.6</span><span>0.9</span></div>
                <b>=</b>
                <div className="mini-vector result"><span>0.66</span><span>0.87</span></div>
              </div>
              <div className="math-note"><InlineMath math="y=Wx" /></div>
            </article>

            <article className="concept-card bridge-card">
              <span className="card-number">POINT</span>
              <blockquote>言葉を点に、<br />学習を<em>座標の調整</em>に。</blockquote>
              <p>これがニューラルネットワークを数式で眺める最初の一歩です。</p>
              <div className="bridge-lines"><i /><i /><i /></div>
            </article>
          </div>
        </section>

        <section className="lesson-section position-section">
          <div className="two-column-title">
            <div>
              <span className="chapter">CHAPTER 02 — 数学の準備 2</span>
              <h2>順番が変わると、<br />意味も変わる。</h2>
            </div>
            <div className="copy">
              <p>「犬が人を追う」と「人が犬を追う」は、同じ単語でも意味が違います。</p>
              <p>Transformerは単語ベクトルに<strong>位置ベクトル</strong>を足して、語順の手がかりを与えます。</p>
            </div>
          </div>
          <div className="position-visual">
            <div className="sentence-row">
              {['人', 'が', '犬', 'を', '追う'].map((word, index) => (
                <div className="word-stack" key={word}>
                  <span className="word-card">{word}</span>
                  <span className="plus">＋</span>
                  <span className="position-wave" style={{ height: `${32 + ((index * 17) % 46)}px` }} />
                  <small>位置 {index + 1}</small>
                </div>
              ))}
            </div>
            <div className="position-equation"><BlockMath math="z_i=x_i+p_i" /></div>
          </div>
          <aside className="math-connection">
            <span>数学とのつながり</span>
            <p>位置の表現には <InlineMath math="\sin" /> と <InlineMath math="\cos" /> が使われることがあります。周期の異なる波を重ねることで、各位置に固有の模様を作れます。</p>
          </aside>
        </section>

        <section className="attention-section" id="attention">
          <div className="attention-intro">
            <span className="chapter light">CHAPTER 03 — Transformerのしくみ</span>
            <h2>文脈を読むしくみ、<br /><em>Self-Attention</em></h2>
            <p>
              ある単語を理解するために、文中のどの単語を見るべきか。
              Transformerは、その「注目度」をすべての組み合わせで計算します。
            </p>
          </div>
          <AttentionPlayground />
        </section>

        <section className="lesson-section qkv-section">
          <div className="section-heading compact">
            <div>
              <span className="chapter">CHAPTER 04 — Attentionの数式</span>
              <h2>3つの役割に<br />分けて考える。</h2>
            </div>
            <p>同じ単語ベクトルを3種類の行列で変換し、「探す・見つけられる・渡す」の役割を持たせます。</p>
          </div>
          <div className="qkv-cards">
            <article className="q-card">
              <span className="letter">Q</span><small>QUERY</small>
              <h3>何を探している？</h3>
              <p>今の単語が必要としている情報を表すベクトル。</p>
              <InlineMath math="Q=XW_Q" />
            </article>
            <article className="k-card">
              <span className="letter">K</span><small>KEY</small>
              <h3>何を持っている？</h3>
              <p>各単語がどんな情報の目印を持つかを表すベクトル。</p>
              <InlineMath math="K=XW_K" />
            </article>
            <article className="v-card">
              <span className="letter">V</span><small>VALUE</small>
              <h3>何を受け渡す？</h3>
              <p>注目されたとき、実際に渡す中身を表すベクトル。</p>
              <InlineMath math="V=XW_V" />
            </article>
          </div>
          <div className="master-equation">
            <div>
              <span>SELF-ATTENTION</span>
              <BlockMath math={String.raw`\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V`} />
            </div>
            <p>この1本を、次のデモで4段階に分けます。</p>
          </div>
          <MatrixWalkthrough />
        </section>

        <section className="multihead-section">
          <div className="multihead-copy">
            <span className="chapter light">CHAPTER 05 — 複数の視点</span>
            <h2>ひとつの文を、<br /><em>複数の視点</em>で読む。</h2>
            <p>
              1組のAttentionだけでは、1種類の関係しか捉えにくい。
              そこで複数の「Head」が、文法・意味・距離などを並行して見ます。
            </p>
          </div>
          <div className="head-visuals">
            {[
              ['HEAD 01', '主語 ↔ 動詞', '誰が行動した？'],
              ['HEAD 02', '修飾語 ↔ 名詞', 'どんなもの？'],
              ['HEAD 03', '代名詞 ↔ 対象', '「それ」は何？'],
            ].map((head, index) => (
              <article key={head[0]}>
                <span>{head[0]}</span>
                <div className={`mini-network network-${index + 1}`}>
                  <i /><i /><i /><i /><b /><b />
                </div>
                <h3>{head[1]}</h3><p>{head[2]}</p>
              </article>
            ))}
          </div>
          <div className="heads-merge">
            <span>それぞれの結果を連結</span>
            <InlineMath math={String.raw`\mathrm{Concat}(head_1,\ldots,head_h)W^O`} />
          </div>
        </section>

        <section className="lesson-section architecture-section" id="architecture">
          <div className="section-heading">
            <div>
              <span className="chapter">CHAPTER 06 — Transformerの全体像</span>
              <h2>部品を重ねて、<br />Transformerへ。</h2>
            </div>
            <p>Attentionの前後に処理を加え、このブロックを何層も重ねると、文脈を深く捉えられるようになります。各ブロックを押して役割を確認しましょう。</p>
          </div>
          <TransformerFlow />
        </section>

        <section className="training-section">
          <div>
            <span className="chapter">CHAPTER 07 — 学習のしくみ</span>
            <h2>では、どうやって<br />賢くなるのか？</h2>
          </div>
          <div className="training-steps">
            <article><span>1</span><div><h3>予測する</h3><p>文章の一部を読み、次の単語の確率を出します。</p></div></article>
            <article><span>2</span><div><h3>誤差を測る</h3><p>正解との差を損失関数 <InlineMath math="L" /> で1つの数にします。</p></div></article>
            <article><span>3</span><div><h3>微分で直す</h3><p><InlineMath math={String.raw`\frac{\partial L}{\partial W}`} /> を使い、誤差が減る方向へ行列を少し動かします。</p></div></article>
          </div>
          <div className="gradient-note">
            <span>数学IIIの出番</span>
            <BlockMath math={String.raw`W_{\mathrm{new}}=W_{\mathrm{old}}-\eta\frac{\partial L}{\partial W}`} />
            <p>微分は「少し変えたら結果がどう変わるか」を教える道具。AIでは、それを何億もの数に対して繰り返します。</p>
          </div>
        </section>

        <section className="recap-section">
          <span className="chapter">RECAP</span>
          <h2>Transformerは、<br />高校数学の<em>組み合わせ</em>。</h2>
          <div className="recap-grid">
            <div><b>VECTOR</b><strong>言葉を<br />座標にする</strong><span>数学C</span></div>
            <div><b>INNER PRODUCT</b><strong>関係の<br />強さを測る</strong><span>数学C</span></div>
            <div><b>EXPONENTIAL</b><strong>注目度を<br />割合にする</strong><span>数学II</span></div>
            <div><b>DIFFERENTIATION</b><strong>誤差から<br />学習する</strong><span>数学III</span></div>
          </div>
          <div className="closing-copy">
            <p>式を暗記する必要はありません。</p>
            <p>「何を測り、何を変換しているか」が見えれば、Transformerはもうブラックボックスではありません。</p>
          </div>
        </section>

        <section className="glossary-section">
          <div>
            <span className="chapter light">MINI GLOSSARY</span>
            <h2>もう一度、<br />言葉を確認する。</h2>
          </div>
          <div className="glossary-list">
            {[
              ['Embedding', '埋め込み', '言葉を意味のベクトルへ変換すること。'],
              ['Attention', '注意機構', '単語どうしの関連度を計算し、情報を混ぜること。'],
              ['Softmax', 'ソフトマックス', '複数の数を、合計1の割合へ変換する関数。'],
              ['Parameter', 'パラメータ', '学習によって調整される行列やベクトルの値。'],
            ].map((item) => (
              <details key={item[0]}>
                <summary><span>{item[0]}</span><b>{item[1]}</b><i>＋</i></summary>
                <p>{item[2]}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="brand"><span className="brand-mark">T</span><span>Transformerをほどく</span></div>
        <p>数学から、AIの中身を考える。</p>
        <a href="#top">ページの先頭へ ↑</a>
      </footer>
    </div>
  )
}

export default App
