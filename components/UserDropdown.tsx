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
        <span className="font-medium text-sm max-w-24 truncate max-sm:hidden" style={{ color: 'var(--color-foreground)' }}>
          {user.name || user.email}
        </span>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
          style={{ color: 'var(--color-foreground)' }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 backdrop-blur-md rounded-lg shadow-xl z-50"
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)'
          }}
        >
          {/* Header */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={user.image || ''} alt={user.name || ''} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm" style={{ color: 'var(--color-foreground)' }}>
                  {user.name || 'User'}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
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
