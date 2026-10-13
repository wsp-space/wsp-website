# WSP 宇宙開発プロジェクト

ハイブリッドロケットと CanSat の活動を公開するサイトです。Next.js の静的書き出しを GitHub Pages に載せます。

公開先は [https://wsp-space.github.io/wsp-website/](https://wsp-space.github.io/wsp-website/) です。

## ローカルで見る

```bash
npm install
npm run dev
```

本番と同じパスで確認するときは、ビルド前に環境変数を付けます。

```bash
# macOS / Linux
NEXT_PUBLIC_BASE_PATH=/wsp-website npm run build

# PowerShell
$env:NEXT_PUBLIC_BASE_PATH="/wsp-website"; npm run build
```

変数なしの `npm run build` は、ローカルの `out/` をルートとしてプレビューするとき用です。

## 活動記録を足す

一記事が一つのフォルダです。画像は本文の隣に置きます。

```text
content/posts/2026-10-20-static-fire/
  index.md
  photo.jpg
  images/setup.png
```

`index.md` の例:

```markdown
---
title: 地上試験の配置を確認した
date: 2026-10-20
excerpt: 弁の手前で一度止めて、離隔と記録係を決めた。
cover: ./photo.jpg
tags:
  - 試験
---

配置はこうなりました。

![試験配置](./photo.jpg)

詳細はサブフォルダでも参照できます。

![配管](./images/setup.png)
```

- 使える画像は JPEG、PNG、WebP、SVG です。
- `draft: true` の記事と、名前が `_` で始まるフォルダは公開されません。雛形は `content/posts/_template` です。
- プロジェクト紹介も同じ仕組みで、`content/projects/<名前>/index.md` に置きます。
- 記事や画像を足したあとは、開発サーバーを入れ直してください。起動時に画像を `public/media` へコピーします。

`main` へ push すると、GitHub Actions がビルドして Pages を更新します。
