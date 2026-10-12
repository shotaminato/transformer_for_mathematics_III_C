# Transformerをほどく

数学III・Cで学ぶベクトル、行列、微分を足場に、Transformerの仕組みを体験しながら学べる1ページ教材です。

## ローカルで動かす

```bash
npm install
npm run dev
```

品質確認には `npm test`、`npm run lint`、`npm run typecheck`、`npm run build` を使います。

## GitHub Pagesで公開する

1. このリポジトリをGitHubへpushします。
2. GitHubの **Settings → Pages → Build and deployment** を開きます。
3. **Source** で **GitHub Actions** を選びます。
4. `main` ブランチへpushすると、テストとビルド後に自動公開されます。

公開URLは `https://<GitHubユーザー名>.github.io/transformer_for_mathematics_III_C/` です。

リポジトリ名を変更した場合は、`vite.config.ts` の `base` も同じ名前へ変更してください。

## 技術構成

- React / TypeScript / Vite
- KaTeX / react-katex
- Vitest
- GitHub Actions / GitHub Pages
