"use client"
import { cn, formatDate } from '@/lib/utils'
import { ArrowBigUp, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { StartupTypeCard } from '@/lib/types'
import { Skeleton } from './ui/skeleton'
import { Session } from 'next-auth'

import { toggleFavorite } from '@/lib/actions/favorites'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

// Add to component props
interface StartupCardProps {
  post: StartupTypeCard;
  session: Session | null;
  initialIsFavorited?: boolean;
  initialFavoriteCount?: number;
}



const StartupCard = ({ post, session, initialIsFavorited, initialFavoriteCount }: StartupCardProps) => {

  const { _createdAt, views, author, title, category, _id, image, description } = post

  // Add state for optimistic updates
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited || false);
  const [favoriteCount, setfavoriteCount] = useState(initialFavoriteCount || 0);


  // Add favorite handler
  const handleToggleFavorite = async () => {
    if (!session?.user?.id) {
      // Redirect to login if user is not authenticated
      await signIn('github');
      return;
    }

    // Optimistic update
    const newIsFavorited = !isFavorited;
    const newCount = newIsFavorited ? favoriteCount + 1 : favoriteCount - 1;

    setIsFavorited(newIsFavorited);
    setfavoriteCount(newCount);

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
    <li className='list-none'>
      {/* <div className='flex-between mt-5 gap-5'>
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="cursor-pointer text-primary font-medium transition-colors">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image src={author?.image || "https://placehold.co/48x48"} alt='placeholder'
            width={48}
            height={48}
            className='rounded-full cursor-pointer hover:opacity-80 transition-opacity'
          />
        </Link>
      </div> */}

      {/* <Link href={`/startup/${_id}`}>
        {image && (
          <Image src={image} alt='placeholder' width={400} height={200} className='startup-card_img' />
        )}
      </Link>
      <div className="flex-between">
        <p className='startup_card_date'>
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleToggleFavorite}
            className="flex items-center gap-1 "
          >
            <ArrowBigUp
              className={`size-6 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-primary'
                }`}
            />
            <span className='text-16-medium '>{favoriteCount}</span>
          </button>
          <div className="flex gap-1.5 ">
            <EyeIcon className='size-6 text-primary' />
            <span className='text-16-medium '>{views}</span>
          </div>
        </div>
      </div>
      <p className='startup-card_desc'>{description?.slice(0, 25)}</p> */}



      {/* <dsiv className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-meduim'>{category}</p>
        </Link>
        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </dsiv> */}


      {/* New Card */}
      <div>
        {/* startup image*/}
        <div className='relative'>
          <Link href={`/startup/${_id}`}>
            {image && (
              <Image src={image} alt='placeholder' width={400} height={300} className='w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]  rounded-2xl mt-4 border border-[#212121] ring-1 ring-inset ring-gray-400/10' />
            )}
          </Link>
        </div>

        <div className='flex flex-col gap-4'>
          {/* category, date adn views */}
          <div className="flex justify-between items-center text-xs font-meduim mt-2">
            <strong className='relative z-10 rounded-lg px-3 py-1.5 font-medium' style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-foreground)' }}>{category}</strong>
            <div className="flex items-center gap-4" style={{ color: 'var(--color-foreground)' }}>
              <span>{formatDate(_createdAt)}</span>
              <span className=' '>{views} views</span>
              <button
                onClick={handleToggleFavorite}
                className="flex items-center gap-1 text-sm group "
              >
                <ArrowBigUp
                  className={`size-5 ${isFavorited ? 'fill-primary' : 'group-hover:fill-primary'
                    }`}
                  style={{
                    color: isFavorited ? 'var(--color-primary)' : 'var(--color-foreground)'
                  }}
                />
                <span style={{ color: 'var(--color-foreground)' }}>{favoriteCount}</span>
              </button>
            </div>
          </div>

          {/* Title and description */}
          <div className='flex flex-col gap-2'>
            <Link href={`/startup/${_id}`} className=''>
              <h3 className='text-xl md:text-2xl font-semibold  leading-tight '>{title}</h3>
            </Link>
            <p className='text-sm leading-6 line-clamp-3' style={{ color: 'var(--color-muted)' }}>{description?.slice(0, 100)}</p>
          </div>

          {/* Auther */}
          <div className='flex items-center gap-3'>
            <Link href={`/user/${author?._id}`}>
              <Image src={author?.image || "https://placehold.co/48x48"} alt='placeholder'
                width={32}
                height={32}
                className='rounded cursor-pointer hover:opacity-80 transition-opacity w-8 h-8'
              />
            </Link>
            <Link href={`/user/${author?._id}`}>
              <p className="cursor-pointer font-medium transition-colors" style={{ color: 'var(--color-foreground)' }}>{author?.name}</p>
            </Link>
          </div>
        </div>
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
