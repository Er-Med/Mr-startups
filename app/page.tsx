// import Image from "next/image";
import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import ProductsSection from "@/components/ProductsSection";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { headers } from "next/headers";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const session = await auth();

  const query = (await searchParams).query;
  const params = {
    search: query || null, userId: session?.user?.id || null
  }

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })



  return (
    <>
      {/* Hero Section */}
      <section className="relative ">
        {/* Overlay */}
        <div className="absolute top-0 w-full h-8px z-10 bg-gradient-to-t from-zinc-950/0 via-zinc-950/20 to-zinc-950/80 "></div>
        <div className="bg-grid"></div>
        <section className='relative flex flex-col items-center justify-center px-4 pb-20 pt-12 md:pt-24'>
          <div className="flex flex-col items-center justify-center h-full gap-6 z-40 max-w-6xl mx-auto">
            {/* Main Headline */}
            <div className="text-center space-y-4 hero-animate flex flex-col items-center justify-center">
              <h1 className='capitalize max-w-5xl text-center leading-[1.15]  md:leading-[1.15]  font-semibold font-sans text-[clamp(48px,5vw,76px)] bg-gradient-to-b from-gray-100 to-gray-200 text-transparent bg-clip-text'>
                Empowering Morocco's Next Generation
              </h1>
              {/* <p className='z-10 font-semibold mb-4  mt-4 text-center max-w-[390px] sm:max-w-[410px] px-4' style={{ color: 'var(--color-muted)' }}>
                Pitch Ideas, Cast Votes, and Get Discovered.
              </p> */}
            </div>

            {/* Search Form */}
            <div className="w-full hero-animate-delay-2">
              <SearchForm query={query} />
            </div>

            {/* Mobile CTA Buttons */}
            <div className="flex md:hidden flex-col sm:flex-row gap-3 items-center justify-center mt-8 hero-animate-delay-3">
              <button
                className="px-6 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-smooth transform hover:-translate-y-1 focus-ring text-sm w-full sm:w-auto btn-primary"
                aria-label="Browse all Moroccan startups"
                role="button"
              >
                Browse All Startups
              </button>
              <button
                className="px-6 py-3 font-semibold rounded-lg transition-smooth focus-ring text-sm w-full sm:w-auto btn-secondary"
                aria-label="Submit your startup project"
                role="button"
              >
                Submit Your Project
              </button>
            </div>

          </div>
        </section>
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/0 via-zinc-950/20 to-zinc-950/80 "></div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="scroll-mt-20">
        <ProductsSection>
          <h2 className="section-heading">
            {query ? `Search results for "${query}"` : "All Startups"}
          </h2>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 '>
            {posts?.length > 0 ? (
              posts.map((post: any) => (
                <StartupCard
                  key={post?._id}
                  post={post as StartupTypeCard}
                  session={session}
                  initialIsFavorited={post.isFavorited || false}
                  initialFavoriteCount={post.favoriteCount || 0}
                />
              ))
            ) : (
              <div className="no-results">
                <p className="text-lg text-muted-foreground mb-4">
                  {query ? `No startups found for "${query}"` : "No startups found"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or browse all categories
                </p>
              </div>
            )}
          </ul>
        </ProductsSection>
      </section>
      <SanityLive />
    </>
  );
}
