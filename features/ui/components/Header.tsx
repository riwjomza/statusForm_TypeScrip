'use client'
import AuthMenu from '@/features/auth/components/AuthMenu';
import { Button } from '@/features/shadcn/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useState, useEffect } from 'react';

interface NavLinkProps {
  path: string;
  children: ReactNode;
}

const NavLink = ({ path, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Button variant={isActive ? 'secondary' : 'ghost'} asChild>
      <Link href={path}>{children}</Link>
    </Button>
  );
};

const Header = () => {
  const pathname = usePathname();
  
  if (pathname === '/auth/sign-in') {
    return null;
  }

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/');
      if (segments.length >= 3) {
        const userSegment = segments[segments.length - 1];
        const userId = userSegment.split(',')[1]; // Extract userId after the comma
        setUserId(userId);
      }
    }
  }, [pathname]);

  const isAdmin = pathname.includes('/admin');

  return (
    <nav className="flex items-center space-x-4 p-4 shadow-md">
      <Image
        priority
        src="/assets/images/logo.png"
        alt="Absence Management"
        width={50}
        height={50}
      ></Image>

      {/* Admin Links */}
      {isAdmin && userId && <NavLink path={`/admin/leaves/YES,${userId}`}>Admin</NavLink>}
      {isAdmin && userId && <NavLink path={`/admin/leaves/YES,${userId}/approved`}>APPROVED</NavLink>}
      {isAdmin && userId && <NavLink path={`/admin/leaves/YES,${userId}/rejected`}>REJECTED</NavLink>}

      {/* User Links */}
      {!isAdmin && userId && <NavLink path={`/leaves/NO,${userId}`}>Documents</NavLink>}
      {!isAdmin && userId && <NavLink path={`/leaves/NO,${userId}/approved`}>APPROVED</NavLink>}
      {!isAdmin && userId && <NavLink path={`/leaves/NO,${userId}/rejected`}>REJECTED</NavLink>}

      <div className="!ml-auto h-[40px] w-[1px] bg-gray-300"></div>

      <AuthMenu />
    </nav>
  );
};

export default Header;
