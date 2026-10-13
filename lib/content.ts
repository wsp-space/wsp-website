import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { media, resolveMedia } from '@/lib/site'

export type Collection = 'posts' | 'projects'

export type Entry = {
  slug: string
  title: string
  date: string
  excerpt: string
  cover?: string
  tags: string[]
  status?: string
  kicker?: string
  order: number
  html: string
}

const showDrafts = process.env.SHOW_DRAFTS === '1'

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

function asDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getUTCFullYear()
    const month = String(value.getUTCMonth() + 1).padStart(2, '0')
    const day = String(value.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  return typeof value === 'string' ? value.slice(0, 10) : ''
}

function asTags(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.filter((tag): tag is string => typeof tag === 'string')
}

function asOrder(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 100
}

function excerptFrom(markdown: string) {
  const line = markdown
    .split('\n')
    .map((item) => item.trim())
    .find((item) => item && !item.startsWith('#') && !item.startsWith('!') && !item.startsWith('```'))
  if (!line) return ''
  const plain = line.replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/[*_`]/g, '')
  return plain.length > 96 ? `${plain.slice(0, 96)}…` : plain
}

async function renderMarkdown(source: string, collection: Collection, slug: string) {
  const file = await remark()
    .use(remarkGfm)
    .use(() => (tree) => {
      visit(tree, 'image', (node) => {
        const image = node as { url?: string }
        if (!image.url) return
        image.url = media(resolveMedia(collection, slug, image.url))
      })
    })
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(source)

  return String(file)
}

async function loadCollection(collection: Collection): Promise<Entry[]> {
  const dir = path.join(process.cwd(), 'content', collection)
  if (!fs.existsSync(dir)) return []

  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.'))

  const documents: Entry[] = []

  for (const entry of entries) {
    const indexPath = path.join(dir, entry.name, 'index.md')
    if (!fs.existsSync(indexPath)) continue

    const parsed = matter(fs.readFileSync(indexPath, 'utf8'))
    if (parsed.data.draft === true && !showDrafts) continue

    const data = parsed.data
    const cover = asString(data.cover)
    documents.push({
      slug: entry.name,
      title: asString(data.title, entry.name),
      date: asDate(data.date),
      excerpt: asString(data.excerpt) || excerptFrom(parsed.content),
      cover: cover ? media(resolveMedia(collection, entry.name, cover)) : undefined,
      tags: asTags(data.tags),
      status: asString(data.status) || undefined,
      kicker: asString(data.kicker) || undefined,
      order: asOrder(data.order),
      html: await renderMarkdown(parsed.content, collection, entry.name),
    })
  }

  if (collection === 'projects') {
    documents.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'ja'))
  } else {
    documents.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'ja'))
  }

  return documents
}

const readCollection = cache(loadCollection)

export function getPosts() {
  return readCollection('posts')
}

export function getProjects() {
  return readCollection('projects')
}

export async function getPost(slug: string) {
  const posts = await getPosts()
  return posts.find((post) => post.slug === slug)
}

export async function getProject(slug: string) {
  const projects = await getProjects()
  return projects.find((project) => project.slug === slug)
}
