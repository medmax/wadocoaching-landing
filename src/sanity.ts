import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
  dataset:   (import.meta.env.VITE_SANITY_DATASET as string) ?? 'production',
  apiVersion: '2025-02-22',
  useCdn: true,
})

// ---------------------------------------------------------------------------
// Image URL builder
// ---------------------------------------------------------------------------
const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ArticlePreview {
  _id:         string
  title:       string
  slug:        { current: string }
  publishedAt: string
  excerpt:     string
  coverImage:  SanityImageSource & { alt: string }
}

export interface ArticleFull extends ArticlePreview {
  body: unknown[]
}

// ---------------------------------------------------------------------------
// GROQ queries
// ---------------------------------------------------------------------------

/** Tous les articles pour la page listing */
export const ALL_ARTICLES_QUERY = `
  *[_type == "article" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { ..., alt }
  }
`

/** Les N derniers articles pour la section homepage */
export const latestArticlesQuery = (n = 3) => `
  *[_type == "article" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) [0...${n}] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { ..., alt }
  }
`

/** Article complet par slug */
export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { ..., alt },
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    }
  }
`
