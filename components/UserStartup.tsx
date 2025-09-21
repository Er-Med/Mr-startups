import { client } from '@/sanity/lib/client'
import React from 'react'
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import StartupCard, { StartupTypeCard } from './StartupCard'
import { Session } from 'next-auth'

interface UserStartupProps {
 id: string;
 session: Session | null;
}

const UserStartup = async ({ id, session }: UserStartupProps) => {
 const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

 if (startups.length === 0) {
  return (
   <div className="user-startups-empty">
    <div className="empty-state">
     <div className="empty-icon">🚀</div>
     <h3 className="empty-title">No startups yet</h3>
     <p className="empty-description">
      This user hasn't created any startups yet. Check back later!
     </p>
    </div>
   </div>
  )
 }

 return (
  <div className="user-startups-grid">
   {startups.map((startup: StartupTypeCard) => (
    <StartupCard
     key={startup._id}
     post={startup}
     session={session}
     initialIsFavorited={false}  // Add this
     initialFavoriteCount={0}    // Add this
    />
   ))}
  </div>
 )
}

export default UserStartup
