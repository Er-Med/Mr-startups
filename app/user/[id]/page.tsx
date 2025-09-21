import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartup from '@/components/UserStartup';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
 const id = (await params).id;
 const session = await auth();

 const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })
 if (!user) return notFound();

 return (
  <div className="social-profile-page">
   {/* Blue Header Section */}
   <div className="profile-header-bg"></div>

   {/* Main Profile Card */}
   <div className="profile-main-card">
    {/* Profile Picture - Overlapping */}
    <div className="profile-picture-container">
     <Image
      src={user.image}
      alt={user.name}
      width={120}
      height={120}
      className="profile-picture"
     />
    </div>


    {/* User Info */}
    <div className="profile-info">
     <h1 className="profile-name">{user.name}</h1>
     <p className="profile-title">{user.bio || "Software Engineer"}</p>
    </div>

    {/* Contact Information */}
    <div className="profile-contact">
     <div className="contact-item">
      <span className="contact-icon">📍</span>
      <span className="contact-text">Morocco</span>
     </div>
     <div className="contact-item">
      <span className="contact-icon">🎂</span>
      <span className="contact-text">Joined on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
     </div>
     {user.email && (
      <div className="contact-item">
       <span className="contact-icon">✉️</span>
       <span className="contact-text">{user.email}</span>
      </div>
     )}
     <div className="contact-item">
      <span className="contact-icon">🔗</span>
      <span className="contact-text">@{user?.username}</span>
     </div>
    </div>
   </div>

   {/* Startups Section */}
   <div className="profile-startups-section">
    <div className="startups-header">
     <h2 className="startups-title">
      {session?.user?.id === id ? "Your Startups" : `${user.name}'s Startups`}
     </h2>
    </div>

    <div className="startups-content">
     <Suspense fallback={<StartupCardSkeleton />}>
      <UserStartup id={id} session={session} />
     </Suspense>
    </div>
   </div>
  </div>
 )

}

export default Page
