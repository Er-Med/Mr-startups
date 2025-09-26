import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { USER_FAVORITES_QUERY } from "@/sanity/lib/queries";
import StartupCard from "@/components/StartupCard";

export default async function FavoritesPage() {
 const session = await auth();

 if (!session?.user?.id) {
  return <div>Please sign in to view favorites</div>;
 }

 const favorites = await client.fetch(USER_FAVORITES_QUERY, {
  userId: session.user.id
 });

 if (!favorites || favorites.length === 0) {
  return (
   <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6">Your Favorite Startups</h1>
    <div className="text-center py-8">
     <p className="text-gray-500">You haven't favorited any startups yet.</p>
     <p className="text-sm text-gray-400 mt-2">Browse startups and click the heart icon to add them to your favorites!</p>
    </div>
   </div>
  );
 }

 return (
  <div className="container mx-auto p-4">
   <h1 className="text-2xl font-bold mb-6">Your Favorite Startups</h1>
   <ul className="grid gap-4">
    {favorites.map((startup: any) => (
     <StartupCard
      key={startup._id}
      post={startup}
      session={session}
      initialIsFavorited={true}
      initialFavoriteCount={startup.favoriteCount}
     />
    ))}
   </ul>
  </div>
 );
}