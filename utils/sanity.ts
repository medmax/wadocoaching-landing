import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Créé côté client uniquement — import.meta.env.VITE_* n'est pas disponible en SSR
function makeSanityClient() {
  return createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
    dataset:   (import.meta.env.VITE_SANITY_DATASET as string) ?? 'production',
    apiVersion: '2025-02-22',
    useCdn: true,
  })
}

export function getSanityClient() {
  return makeSanityClient()
}

export function urlFor(source: SanityImageSource) {
  const builder = createImageUrlBuilder(makeSanityClient())
  return builder.image(source)
}

export interface Category {
  _id:   string
  title: string
  slug:  { current: string }
}

export interface ArticlePreview {
  _id:         string
  title:       string
  slug:        { current: string }
  publishedAt: string
  excerpt:     string
  coverImage:  SanityImageSource & { alt: string }
  categories:  Category[]
}

export interface ArticleFull extends ArticlePreview {
  body: unknown[]
  attachment?: {
    asset: { url: string }
    label?: string
  }
}

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id, title, slug
  }
`

export const ALL_ARTICLES_QUERY = `
  *[_type == "article" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, coverImage { ..., alt },
    categories[]->{ _id, title, slug }
  }
`

export const latestArticlesQuery = (n = 3) => `
  *[_type == "article" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) [0...${n}] {
    _id, title, slug, publishedAt, excerpt, coverImage { ..., alt }
  }
`

export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, coverImage { ..., alt },
    categories[]->{ _id, title, slug },
    attachment { label, asset->{ url } },
    body[] {
      ...,
      _type == "image" => { ..., asset-> }
    }
  }
`
