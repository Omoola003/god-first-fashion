// lib/sanity.image.js
import { createImageUrlBuilder } from '@sanity/image-url' 
import { sanityClient } from './sanity.client'

// Use the named function directly
const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source).auto('format')
}