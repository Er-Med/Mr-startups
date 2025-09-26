import { defineQuery } from "next-sanity";

// export const STARTUPS_QUERY = defineQuery(
//   `*[_type == "startup" && defined(slug.current) && !defined($search)|| title match $search || category match $search || author->name match $search] | order(_createdAt desc)  {
//   _id,
//   title,
//   slug,
//   _createdAt,
//   author->{
//     _id,
//     name,
//     image,
//     bio
//   },
//   views,
//   description,
//   category,
//   image
// }`
// );

export const STARTUPS_QUERY = defineQuery(
  `*[_type == "startup" && defined(slug.current) && (!defined($search) || title match $search || category match $search || author->name match $search)] | order(_createdAt desc)  {
  _id,
  title,
  slug,
  _createdAt,
  author->{
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  category,
  image,
  "favoriteCount": count(favorites),
  "isFavorited": $userId != null && $userId in favorites[]._ref
}`
);

export const STARTUPS_BY_ID_QUERY =
  defineQuery(`*[_type  == "startup" && _id == $id][0] {
  _id,
  title,
  slug,
  _createdAt,
  author->{
    _id,
    name,
    image,
    username,
    bio
  },
  views,
  description,
  category,
  image,
  pitch
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
_id, views
}`);

// export  const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
// `*[_type == "author" && id== $id[0]]{
//             _id,
//             id,
//             name,
//             username,
//             email,
//             image,
//             bio
// }`
// )

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
  }
  `);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `);

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(
  `*[_type == "startup" && author._ref == $id] | order(_createdAt desc)  {
      _id,
      title,
      slug,
      _createdAt,
      author->{
        _id,
        name,
        image,
        bio
      },
      views,
      description,
      category,
      image
    }`
);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);

// Check if user has favorited a startup
export const IS_FAVORITED_QUERY = defineQuery(`
  *[_type == "startup" && _id == $startupId && $userId in favorites[]._ref][0] {
    _id
  }
`);

// Get user's favorite startups
export const USER_FAVORITES_QUERY = defineQuery(`
  *[_type == "startup" && $userId in favorites[]._ref] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    "favoriteCount": count(favorites)
  }
`);

// Get startup's favorite count
export const STARTUP_FAVORITE_COUNT_QUERY = defineQuery(`
  *[_type == "startup" && _id == $startupId][0] {
    _id,
    "favoriteCount": count(favorites)
  }
`);
