export const tokens = ['彼女', 'は', '猫', 'を', '撫でた']

export const queries = [
  [1.2, 0.2, 0.8],
  [0.2, 0.3, 0.1],
  [0.8, 1.3, 0.3],
  [0.1, 0.4, 0.2],
  [1.1, 0.9, 1.4],
]

export const keys = [
  [1.1, 0.1, 0.7],
  [0.1, 0.2, 0.1],
  [0.7, 1.4, 0.4],
  [0.1, 0.4, 0.1],
  [1.2, 0.6, 1.3],
]

export const values = [
  [0.9, 0.2, 0.7],
  [0.1, 0.2, 0.1],
  [0.5, 1.0, 0.4],
  [0.1, 0.3, 0.2],
  [0.8, 0.5, 1.0],
]

export const flowSteps = [
  {
    id: 'embedding',
    label: '埋め込み',
    short: 'Embedding',
    description:
      '単語を、意味を表す数百次元のベクトルへ変換します。近い意味の単語は、空間でも近くに配置されます。',
    math: String.raw`x_i = E(\mathrm{token}_i)`,
  },
  {
    id: 'position',
    label: '位置情報',
    short: '+ Position',
    description:
      'Attentionだけでは語順が分からないため、各単語の位置を表すベクトルを足します。',
    math: String.raw`z_i = x_i + p_i`,
  },
  {
    id: 'attention',
    label: '自己注意',
    short: 'Attention',
    description:
      '各単語が、文中のどの単語をどれだけ参照するかを内積から計算し、必要な情報を集めます。',
    math: String.raw`\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V`,
  },
  {
    id: 'addnorm',
    label: '残差・正規化',
    short: 'Add & Norm',
    description:
      '入力を近道として足し戻し、値のスケールを整えます。深いネットワークでも情報と勾配を流しやすくします。',
    math: String.raw`\mathrm{LayerNorm}(z + \mathrm{Attention}(z))`,
  },
  {
    id: 'ffn',
    label: '全結合層',
    short: 'Feed Forward',
    description:
      '集めた情報を各単語ごとに変換します。同じ小さなニューラルネットを、すべての位置へ独立に適用します。',
    math: String.raw`\mathrm{FFN}(x)=W_2\,\sigma(W_1x+b_1)+b_2`,
  },
] as const
