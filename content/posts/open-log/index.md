---
title: 活動記録を、フォルダの形で残す
date: 2026-10-13
excerpt: 記事と画像を同じフォルダに置く。GitHub 上で編集すれば、このページが更新されます。
cover: ./folders.svg
tags:
  - サイト
  - 記録
---

このサイトの活動記録は、ブログサービスを別に立てていません。リポジトリの `content/posts` にフォルダを足すと、一覧と個別ページが増えます。

形はこれだけです。

```text
content/posts/2026-10-13-burning-check/
  index.md
  photo.jpg
  images/detail.png
```

`index.md` の先頭にタイトルと日付を書きます。画像は同じフォルダに置き、本文から相対パスで参照します。サブフォルダに入れても辿れます。

![フォルダとページの対応](./folders.svg)

写真は JPEG、PNG、WebP、SVG を想定しています。図面の書き出しでも、現場の写真でも、置き場所は同じです。下書きのまま公開したくない記事は、先頭に `draft: true` を付けるか、フォルダ名を `_` から始めてください。

雛形は `content/posts/_template` にあります。コピーして名前を変え、`draft` を外してからコミットします。
