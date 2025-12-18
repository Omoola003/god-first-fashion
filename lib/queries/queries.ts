import { groq } from 'next-sanity'

export const collectionsQuery = groq`
  *[_type == "collection"] | order(_createdAt desc){
    _id,
    name,
    "slug": slug.current,
    category,
    priceRange,
    description,
    heroImage
  }
`

export const collectionBySlugQuery = groq`
  *[_type == "collection" && slug.current == $slug][0]{
    name,
    category,
    priceRange,
    longDescription,
    heroImage,
    // Fix: Using the bracket syntax to sort the local array
    "galleryImages": galleryImages[] | order(order asc) {
      image,
      order
    },
    featuredProduct->{
      name,
      price,
      "slug": slug.current, // Added slug, you'll likely need it for links
      description,
      image
    },
    seo
  }
`

export const allProductsQuery = groq`
  *[_type == "product" && (!defined($collectionSlug) || *[_type == "collection" && slug.current == $collectionSlug][0].featuredProduct._ref == _id || references(*[_type == "collection" && slug.current == $collectionSlug][0]._id)) ] | order(_createdAt desc){
    name,
    price,
    description,
    image,
    "slug": slug.current,
    "collection": *[_type == "collection" && featuredProduct._ref == ^._id][0]{
      name,
      "slug": slug.current
    }
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    name,
    price,
    description,
    image,
    "slug": slug.current,
    // We look for the collection that references this product
    "collection": *[_type == "collection" && featuredProduct._ref == ^._id][0]{
      name,
      "slug": slug.current
    }
  }
`

export const lookbookQuery = groq`
  *[_type == "lookbook" && slug.current == $slug][0]{
    title,
    description,
    coverImage,
    images
  }
`;

// Add this new query to your queries.js file
export const allLookbooksQuery = groq`
  *[_type == "lookbook"] | order(_createdAt desc){
    title,
    "slug": slug.current,
    description,
    coverImage
  }
`;

// Keep this one as is for the [slug] detail page
export const lookbookBySlugQuery = groq`
  *[_type == "lookbook" && slug.current == $slug][0]{
    title,
    description,
    coverImage,
    images
  }
`;