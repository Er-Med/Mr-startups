// Client-safe types that don't import from Sanity
export interface Author {
  _id: string;
  _type: "author";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: string;
  bio?: string;
  email?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface Startup {
  _id: string;
  _type: "startup";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author?: Author;
  views?: number;
  description?: string;
  category?: string;
  image?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  demo?: string;
  tags?: string[];
  isActive?: boolean;
  funding?: string;
  team?: string[];
  location?: string;
  founded?: string;
  employees?: string;
  revenue?: string;
  featured?: boolean;
}

export interface Slug {
  _type: "slug";
  current?: string;
}

// Client-safe type for StartupCard
export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };
