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
          <a href="#inside">中身</a>
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
              <a className="button primary" href="#inside">学びはじめる <span>↓</span></a>
              <span className="reading-time">全9章・約30分</span>
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

        <section className="lesson-section inside-section" id="inside">
          <div className="section-heading">
            <div>
              <span className="chapter">CHAPTER 01 — モデルの中身</span>
              <h2>入っているのは、<br /><em>数の表</em>です。</h2>
            </div>
            <p>
              Transformerベースのモデルの正体は、役割の決まった数の表です。
              学習で読んだ文章は、この表の数を調整するために使われ、文の形では残りません。
              答えの文は、表を使ってその場で計算します。
            </p>
          </div>
          <ol className="inside-grid">
            <li>
              <span>01</span>
              <div>
                <h3>語彙の名簿</h3>
                <p>文字列と番号の対応です。単語、助詞、語の部品、区切りの印が並び、埋め込み表の行見出しになります。</p>
                <small>CHAPTER 03</small>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>トークンのベクトル</h3>
                <p>番号ひとつにつき数百個の数です。似た文脈のトークンは、学習のあと座標が近くなります。</p>
                <small>CHAPTER 02</small>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>位置の情報</h3>
                <p>文の何番目かを表します。ベクトルの表として持つ方式と、<InlineMath math="\sin" /> と <InlineMath math="\cos" /> から計算する方式があります。</p>
                <small>CHAPTER 04</small>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>注意の行列</h3>
                <p>どのトークンをどれだけ見るかを計算する行列です。関係の強さは、文を読むときに内積で求めます。</p>
                <small>CHAPTER 05</small>
              </div>
            </li>
            <li>
              <span>05</span>
              <div>
                <h3>変換の行列</h3>
                <p>集めた情報を、位置ごとに別のベクトルへ変える行列です。注意の行列とあわせて、層の数だけ別々に入ります。各層には、数の大きさを整える小さなベクトルもあります。</p>
                <small>CHAPTER 08</small>
              </div>
            </li>
            <li>
              <span>06</span>
              <div>
                <h3>次のトークンを出す表</h3>
                <p>最後のベクトルから、名簿の各トークンが次に来る確率を計算します。トークンのベクトルの表と、同じ数を兼ねることもあります。</p>
                <small>CHAPTER 09</small>
              </div>
            </li>
          </ol>
          <aside className="math-connection inside-note">
            <span>ここから先</span>
            <p>この6種類が、モデルファイルの中身です。ここから先で、それぞれの表が何を表しているかを開いていきます。</p>
          </aside>
        </section>

        <section className="lesson-section foundation" id="foundation">
          <div className="section-heading">
            <div>
              <span className="chapter">CHAPTER 02 — 数学の準備 1</span>
              <h2>まず、言葉を<br /><em>ベクトル</em>にする。</h2>
            </div>
            <p>
              コンピューターは言葉をそのまま扱えません。そこで、単語を数字の並びに置き換えます。
              数学Cで学ぶベクトルと同じです。何次元にするか、数字をどう埋めるかは、下で決まります。
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

          <div className="embedding-answers">
            <article>
              <span className="card-number">03 — DIMENSION</span>
              <h3>次元は、学習の前に選ぶ</h3>
              <p>
                次元は、単語ひとつを書く数字の個数です。上の図は軸を2本にした見取り図で、平面に描けます。
                モデルの中では軸が数百本あり、単語ひとつがたとえば 768 個の座標を持ちます。
              </p>
              <div className="dim-scale" aria-label="見取り図は2次元、モデルの例は768次元">
                <div>
                  <b>見取り図</b>
                  <span>2</span>
                  <small>軸は2本。平面に描ける</small>
                </div>
                <div className="chosen">
                  <b>モデルの例</b>
                  <span>768</span>
                  <small>軸は768本。1単語が768個の数</small>
                </div>
              </div>
              <div className="tradeoff"><b>少ない</b><span>違う意味の単語が、同じ場所に押しつぶされる</span></div>
              <div className="tradeoff"><b>多い</b><span>調整する数字が増え、必要な文章も計算も増える</span></div>
              <p>
                768 は、あらかじめ用意した候補のひとつです。128 や 4096 も試せます。
                単語を区別できて、用意できる文章と計算で学習しきれる大きさを残します。
              </p>
            </article>

            <article>
              <span className="card-number">04 — TABLE</span>
              <h3>数字は、表を学習して埋める</h3>
              <p>
                単語を行、次元を列にした表を作ります。名前は埋め込み行列 <InlineMath math="E" /> です。
                最初に入っている数はランダムです。単語をベクトルにするとは、その行を取り出すことです。
              </p>
              <div className="embed-table" aria-label="学習後の埋め込み表のイメージ。猫と犬は近く、車は離れている">
                <div className="embed-row head"><span>単語</span><span>1</span><span>2</span><span>3</span><span>…</span></div>
                <div className="embed-row near"><span>猫</span><span>0.80</span><span>0.91</span><span>0.18</span><span>…</span></div>
                <div className="embed-row near"><span>犬</span><span>0.76</span><span>0.88</span><span>0.22</span><span>…</span></div>
                <div className="embed-row far"><span>車</span><span>0.12</span><span>0.24</span><span>0.93</span><span>…</span></div>
              </div>
              <p className="table-caption">学習後のイメージ。猫と犬の行が近く、車の行は離れています。</p>
              <p>
                学習では、大量の文を読ませて次の単語を繰り返し予測します。ずれるたびに、
                CHAPTER 09 の微分で、ずれが小さくなる方向へ表の数を動かします。
                似た文脈に現れる単語は、行が近づきます。「猫」と「犬」はどちらも「撫でる」の近くに出るので座標が寄り、「車」は離れます。
              </p>
              <p>
                図の「生き物らしさ」という軸の名前は、並びを見たあとに人間が付けたものです。
              </p>
              <div className="answer-math"><InlineMath math={String.raw`\vec{x}_{猫}=E(\mathrm{猫})`} /></div>
            </article>
          </div>
          <aside className="math-connection">
            <span>この段階</span>
            <p>
              この表を引いた直後は、同じ単語はどの文でも同じベクトルです。まわりの語を見て混ぜ合わせるのは、CHAPTER 05 の Attention からです。
            </p>
          </aside>
        </section>

        <section className="lesson-section vocab-section">
          <div className="section-heading">
            <div>
              <span className="chapter">CHAPTER 03 — 語彙</span>
              <h2>語は、名簿の<br /><em>部品</em>で組む。</h2>
            </div>
            <p>
              埋め込み表の行は、世の中の語を1語ずつ並べたものではありません。
              学習の前に作る名簿の1項目です。この名簿を語彙と呼びます。
            </p>
          </div>

          <div className="vocab-grid">
            <article>
              <span className="card-number">01 — ROSTER</span>
              <h3>語彙は、行の名簿</h3>
              <p>
                1行が1トークンです。単語のほかに、助詞、記号、語の続き、文の区切りの印も入ります。
              </p>
              <ul className="token-kinds">
                <li><b>単語</b><span>猫、犬、車</span></li>
                <li><b>助詞</b><span>は、を、た</span></li>
                <li><b>続き</b><span>##する、##で</span></li>
                <li><b>印</b><span>[CLS]、[UNK]</span></li>
              </ul>
              <p>
                5万語彙は、読める語が5万個という意味ではありません。部品を置く枠が5万個です。
                この数も次元と同じく、学習の前に人が決めます。3万や10万のモデルもあります。
              </p>
            </article>

            <article>
              <span className="card-number">02 — SIZE</span>
              <h3>関係は、表にしない</h3>
              <p>
                学習するのは、トークンごとのベクトルです。語彙5万、次元768なら約3800万個の数で、
                1個を4バイトにすると約150MBです。
              </p>
              <div className="size-pair" aria-label="ベクトルの表は約150MB。ペアを全部書くと25億個">
                <div className="kept">
                  <b>保存する表</b>
                  <span>約150MB</span>
                  <small>5万 × 768 個の数</small>
                </div>
                <div>
                  <b>ペアを全部書くと</b>
                  <span>25億個</span>
                  <small>5万 × 5万。この表は作らない</small>
                </div>
              </div>
              <p>
                近さは、2本のベクトルの内積を必要なときに計算します。計算ルールは、どのトークンにも同じ行列で覚えます。
                768×768 なら約60万個です。層の数だけ重ねるのでモデル全体は表より大きくなりますが、増え方は層の数 × 次元 × 次元です。
              </p>
            </article>

            <article>
              <span className="card-number">03 — METHOD</span>
              <h3>作り方には、名前がある</h3>
              <p>
                文を名簿の番号へ切る処理がトークン化、そのプログラムがトークナイザです。
                語より短い部品も1行にする方法を、サブワード分割と呼びます。
              </p>
              <div className="algo-list">
                <div><b>BPE</b><span>文字から始め、よく隣り合う2つを合体する。GPT-2 など。</span></div>
                <div><b>WordPiece</b><span>合体で名簿を育てる。訓練文をうまく表せる部品を選ぶ。BERT 系。</span></div>
                <div><b>Unigram</b><span>大きな名簿から、なくてもよい部品を削る。SentencePiece。</span></div>
              </div>
              <p>
                よく出る語は1行のまま残り、まれな語は部品の列になります。名簿にない語は登録済みの部品まで割り、
                それでも割れなければ文字やバイトまで割るか、[UNK] にまとめます。
              </p>
            </article>
          </div>

          <div className="vocab-example">
            <header>
              <span className="card-number">OPEN MODEL</span>
              <h3>公開されている名簿の実物</h3>
              <p>
                東北大学の{' '}
                <a href="https://huggingface.co/tohoku-nlp/bert-base-japanese-v3" target="_blank" rel="noreferrer">
                  tohoku-nlp/bert-base-japanese-v3
                </a>
                {' '}は、語彙 32,768 です。MeCab で語に切ったあと、WordPiece で名簿を作っています。番号は意味の近さではなく、名簿上の位置です。
              </p>
            </header>
            <table className="vocab-table">
              <thead>
                <tr><th>番号</th><th>トークン</th><th>中身</th></tr>
              </thead>
              <tbody>
                <tr><td>0</td><td>[PAD]</td><td>長さをそろえる埋め草</td></tr>
                <tr><td>1</td><td>[UNK]</td><td>部品にも割れなかったときの印</td></tr>
                <tr><td>465</td><td>は</td><td>1文字のまま残ったもの</td></tr>
                <tr><td>3767</td><td>猫</td><td>語がそのまま1行</td></tr>
                <tr><td>3732</td><td>犬</td><td>語がそのまま1行</td></tr>
                <tr><td>5910</td><td>車</td><td>語がそのまま1行</td></tr>
                <tr><td>12556</td><td>##する</td><td>前の部品にくっつける続き</td></tr>
                <tr><td>31615</td><td>トランスフォーマー</td><td>よく出たので、長い語も1行</td></tr>
              </tbody>
            </table>
            <p className="vocab-note">
              「撫でた」と「撫でる」は、この名簿に1行もありません。「撫」は 2585 番、「た」は 449 番です。
              そのような語は、登録済みの部品まで割って読みます。
            </p>
          </div>
        </section>

        <section className="lesson-section position-section">
          <div className="two-column-title">
            <div>
              <span className="chapter">CHAPTER 04 — 数学の準備 2</span>
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
            <span className="chapter light">CHAPTER 05 — Transformerのしくみ</span>
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
              <span className="chapter">CHAPTER 06 — Attentionの数式</span>
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
            <span className="chapter light">CHAPTER 07 — 複数の視点</span>
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
              <span className="chapter">CHAPTER 08 — Transformerの全体像</span>
              <h2>部品を重ねて、<br />Transformerへ。</h2>
            </div>
            <p>Attentionの前後に処理を加え、このブロックを何層も重ねると、文脈を深く捉えられるようになります。各ブロックを押して役割を確認しましょう。</p>
          </div>
          <TransformerFlow />
        </section>

        <section className="training-section">
          <div>
            <span className="chapter">CHAPTER 09 — 学習のしくみ</span>
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
              ['Embedding', '埋め込み', '単語ごとの行を並べた表から、そのベクトルを取り出すこと。次元は学習前に選び、中身は学習で決まる。'],
              ['Vocabulary', '語彙', '埋め込み表の行の見出し一覧。語そのものと、語より短い部品が入る。'],
              ['Tokenizer', 'トークナイザ', '文を語彙の番号へ切るプログラム。名簿の作り方には BPE や WordPiece がある。'],
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
