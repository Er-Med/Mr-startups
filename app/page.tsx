// import Image from "next/image";
import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import ProductsSection from "@/components/ProductsSection";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

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
      <section className="relative bg-[#09090b]">
        <div className="bg-grid"></div>
        <section className='relative flex flex-col items-center justify-center px-4 pb-20 pt-12 md:pt-24'>
          <div className="flex flex-col items-center justify-center h-full gap-6 z-40 max-w-6xl mx-auto">
            {/* Main Headline */}
            <div className="text-center space-y-4 hero-animate flex flex-col items-center justify-center">
              <h1 className='capitalize max-w-5xl text-center leading-[1.15]  md:leading-[1.15] text-white font-bold font-montserrat text-[max(48px,min(5vw,76px))]'>
                <span className="bg-gradient-to-r from-red-700 to-green-700 bg-clip-text text-transparent">  The Arab World's</span> most
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> innovative</span> digital products.
              </h1>
              <p className='z-10 font-semibold mb-4  mt-4 text-center max-w-[390px] sm:max-w-[410px] px-4 text-gray-400'>
                Submit your projects and get discovered.
              </p>
            </div>

            {/* Search Form */}
            <div className="w-full hero-animate-delay-2">
              <SearchForm query={query} />
            </div>

            {/* Mobile CTA Buttons */}
            <div className="flex md:hidden flex-col sm:flex-row gap-3 items-center justify-center mt-8 hero-animate-delay-3">
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-smooth transform hover:-translate-y-1 focus-ring text-sm w-full sm:w-auto"
                aria-label="Browse all Moroccan startups"
                role="button"
              >
                Browse All Startups
              </button>
              <button
                className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-lg transition-smooth focus-ring text-sm w-full sm:w-auto"
                aria-label="Submit your startup project"
                role="button"
              >
                Submit Your Project
              </button>
            </div>

          </div>
        </section>
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/0 via-zinc-950/20 to-zinc-950/80"></div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="scroll-mt-20">
        <ProductsSection>
          <h2 className="section-heading">
            {query ? `Search results for "${query}"` : "All Startups"}
          </h2>
          <ul className='card_grid'>
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
