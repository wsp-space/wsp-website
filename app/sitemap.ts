import type { MetadataRoute } from 'next'
import { getPosts, getProjects } from '@/lib/content'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])
  const paths = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/join',
    ...projects.map((project) => `/projects/${project.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ]

  return paths.map((path) => ({
    url: `${site.url}${path}/`,
  }))
}
