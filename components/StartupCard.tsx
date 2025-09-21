"use client"
import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'
import { Session } from 'next-auth'

import { Heart } from 'lucide-react'
import { toggleFavorite } from '@/lib/actions/favorites'
import { useState } from 'react'

// Add to component props
interface StartupCardProps {
  post: StartupTypeCard;
  session: Session | null;
  initialIsFavorited?: boolean;
  initialFavoriteCount?: number;
}


export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post, session, initialIsFavorited, initialFavoriteCount }: StartupCardProps) => {

  const { _createdAt, views, author, title, category, _id, image, description } = post

  // Add state for optimistic updates
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited || false);
  const [favoriteCount, setfavoriteCount] = useState(initialFavoriteCount || 0);


  // Add favorite handler
  const handleToggleFavorite = async () => {
    if (!session?.user?.id) return;

    // Optimistic update
    const newIsFavorited = !isFavorited;
    const newCount = newIsFavorited ? favoriteCount + 1 : favoriteCount - 1;

    setIsFavorited(newIsFavorited);
    setfavoriteCount(newCount);

    // try {
    //   const result = await toggleFavorite(post._id);
    //   if (result.status === "ERROR") {
    //     // Revert on error
    //     setIsFavorited(!newIsFavorited);
    //     setfavoriteCount(favoriteCount);
    //   }
    // }
    try {
      const result = await toggleFavorite(post._id);
      if (result.status === "SUCCESS") {
        // Update with actual server response
        setIsFavorited(result.isFavorited);
        setfavoriteCount(result.favoriteCount);
      } else if (result.status === "ERROR") {
        // Revert on error
        setIsFavorited(!newIsFavorited);
        setfavoriteCount(favoriteCount);
      }
    }
    catch (error) {
      // Revert on error
      setIsFavorited(!newIsFavorited);
      setfavoriteCount(favoriteCount);
    }
  };

  return (
    <li className='startup-card group border list-none'>
      <div className="flex-between">
        <p className='startup_card_date'>
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      {/* // Add to JSX (in the flex-between section with views) */}
      <div className="flex gap-1.5">
        <EyeIcon className='size-6 text-primary' />
        <span className='text-16-medium'>{views}</span>

        <button
          onClick={handleToggleFavorite}
          className="flex items-center gap-1"
          disabled={!session?.user?.id}
        >
          <Heart
            className={`size-6 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-400'
              }`}
          />
          <span className='text-16-medium'>{favoriteCount}</span>
        </button>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className="flex-1">
          {session?.user?.id === author?._id ? (
            <Link href={`/user/${author?._id}`}>
              <p>{author?.name}</p>
            </Link>
          ) : (
            <p>{author?.name}</p>
          )}
          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold'>{title}</h3>
          </Link>
        </div>
        {session?.user?.id === author?._id ? (
          <Link href={`/user/${author?._id}`}>
            <Image src={author?.image || "https://placehold.co/48x48"} alt='placeholder'
              width={48}
              height={48}
              className='rounded-full '
            />
          </Link>
        ) : (
          <Image src={author?.image || "https://placehold.co/48x48"} alt='placeholder'
            width={48}
            height={48}
            className='rounded-full '
          />
        )}
      </div>
      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>{description}</p>
        {image && (
          <Image src={image} alt='placeholder' width={400} height={200} className='startup-card_img' />
        )}
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-meduim'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

export const StartupCardSkeleton = () => (
  <>
    {[1, 2, 3, 4].map((index: number) => (
      <li key={cn('skeleton', index)}>
        <Skeleton className='startup-card_skeleton' />
      </li>
    ))}
  </>
)
export default StartupCard
