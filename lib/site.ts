export const site = {
  name: 'WSP',
  title: 'WSP 宇宙開発プロジェクト',
  description:
    'ハイブリッドロケットと成層圏気球を、学生の手で設計・製作・試験まで進める宇宙開発プロジェクトです。',
  url: 'https://www.wsp-wakayama.space',
  repo: 'https://github.com/wsp-space/wsp-website',
  org: 'https://github.com/wsp-space',
  joinForm: 'https://forms.cloud.microsoft/r/srE7ADRLKr',
}

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/wsp_wadai' },
  { label: 'X', href: 'https://x.com/wsp_wadai' },
  { label: 'GitHub', href: site.org },
]

export type Person = {
  name: string
  role: string
  photo?: string
  message: string[]
}

export const representative: Person = {
  name: '鈴木 一郎',
  role: 'WSP 代表（システム工学部 3年）',
  message: [
    'WSP は、和歌山から宇宙を目指す学生のプロジェクトです。ハイブリッドロケットと成層圏気球の二つを、計画から打上・放球、回収まで、すべて自分たちの手で進めています。',
    'ロケットも気球も、一人では飛ばせません。図面を引く人、配線をする人、手順書を書く人、写真を撮る人。それぞれの持ち場がつながって、はじめて一回の打上になります。',
    '経験は問いません。宇宙に少しでも興味があれば、ぜひ一度、活動を見に来てください。',
  ],
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const yearSteps = [
  {
    n: '01',
    title: '構想',
    body: '何を飛ばし、何を測るかを一文で決める。目標高度より先に、成功と中止の条件を書く。',
  },
  {
    n: '02',
    title: '設計',
    body: '機体やペイロード、推進、電装の取り合いや寸法を図面に落とす。届く部品の寸法も同じ紙に書く。',
  },
  {
    n: '03',
    title: '製作',
    body: '加工、プリント、結線。図面と現物がずれた箇所は、その週の記録に残す。',
  },
  {
    n: '04',
    title: '試験',
    body: '燃焼試験、低温試験、通信と追跡。人の配置と退避を、スイッチを入れる前に地面へ出す。',
  },
  {
    n: '05',
    title: '報告',
    body: '結果と中止の理由をブログに残し、次の図面へ戻す。',
  },
]

export function formatDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return iso
  return `${Number(match[1])}年${Number(match[2])}月${Number(match[3])}日`
}

export function resolveMedia(collection: string, slug: string, url: string) {
  if (!url || /^(https?:|data:|mailto:)/.test(url)) return url
  if (url.startsWith('/')) return url
  const clean = url.replace(/^\.\//, '').replace(/\\/g, '/')
  return `/media/${collection}/${slug}/${clean}`
}

export function media(url?: string) {
  if (!url) return ''
  if (/^(https?:|data:|mailto:)/.test(url)) return url
  const normalized = url.startsWith('/') ? url : `/${url}`
  return `${basePath}${normalized}`
}

export function githubEditUrl(collection: string, slug: string) {
  return `${site.repo}/edit/main/content/${collection}/${slug}/index.md`
}
