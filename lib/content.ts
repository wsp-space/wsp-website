import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { media, resolveMedia, type Person } from '@/lib/site'

export type Collection = 'posts' | 'projects' | 'archive'

export type ArchiveCategory = 'rocket' | 'balloon'

export type Fact = { label: string; value: string }

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
  pm?: Person
  category?: ArchiveCategory
  year?: number
  period?: string
  facts: Fact[]
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

function asYear(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && /^\d{4}/.test(value)) return Number(value.slice(0, 4))
  return undefined
}

function asCategory(value: unknown): ArchiveCategory | undefined {
  return value === 'rocket' || value === 'balloon' ? value : undefined
}

function asFacts(value: unknown): Fact[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .map((item) => ({ label: asString(item.label), value: String(item.value ?? '') }))
    .filter((item) => item.label && item.value)
}

function asPerson(value: unknown, collection: Collection, slug: string): Person | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const data = value as Record<string, unknown>
  const name = asString(data.name)
  if (!name) return undefined
  const photo = asString(data.photo)
  const message = asString(data.message)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  return {
    name,
    role: asString(data.role),
    photo: photo ? media(resolveMedia(collection, slug, photo)) : undefined,
    message,
  }
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
      pm: asPerson(data.pm, collection, entry.name),
      category: asCategory(data.category),
      year: asYear(data.year),
      period: asYear(data.year) ? `${asYear(data.year)}年度` : undefined,
      facts: asFacts(data.facts),
      html: await renderMarkdown(parsed.content, collection, entry.name),
    })
  }

  if (collection === 'projects') {
    documents.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'ja'))
  } else if (collection === 'archive') {
    documents.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title, 'ja'))
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

export function getArchive() {
  return readCollection('archive')
}

export async function getArchiveEntry(slug: string) {
  const entries = await getArchive()
  return entries.find((entry) => entry.slug === slug)
}
