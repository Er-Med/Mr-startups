"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { User, ChevronDown, Users, LogOut, ArrowBigUp } from 'lucide-react';
import { AvatarFallback, AvatarImage, Avatar } from './ui/avatar';

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  userId?: string;
}

const UserDropdown = ({ user, userId }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-black/30 transition-all duration-200"
      >
        <Avatar className="size-8">
          <AvatarImage src={user.image || ''} alt={user.name || ''} />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <span className="text-white font-medium text-sm max-w-24 truncate">
          {user.name || user.email}
        </span>
        <ChevronDown
          className={`size-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={user.image || ''} alt={user.name || ''} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium text-sm">
                  {user.name || 'User'}
                </p>
                <p className="text-gray-400 text-xs">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href={`/user/${userId}`}
              className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <User className="size-4" />
              <span className="text-sm">Your Profile</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <ArrowBigUp className="size-4" />
              <span className="text-sm">Your Favorites</span>
            </Link>

            <div className="px-4 py-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <Users className="size-4" />
                Join Discord
              </button>
            </div>

            <div className="border-t border-white/10 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/10 transition-colors duration-200 w-full text-left"
              >
                <LogOut className="size-4" />
                <span className="text-sm">Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
