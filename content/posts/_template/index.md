---
title: 記事タイトル
date: 2026-10-13
excerpt: 一覧に出る、二文までの説明
cover: ./photo.svg
tags:
  - 活動記録
draft: true
---

このフォルダは雛形です。名前が `_` で始まるので、サイトには出ません。

コピー先の例:

```text
content/posts/2026-10-20-static-fire/
  index.md
  photo.jpg
```

本文中の画像は、同じフォルダからの相対パスで書きます。

![試験の写真](./photo.svg)

公開するときは `draft: true` を消し、フォルダ名の先頭の `_` も外してください。
