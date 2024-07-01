'use client';
import AuthMenu from '@/features/auth/components/AuthMenu';
import { Button } from '@/features/shadcn/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useState,useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

interface NavLinkProps {
  path: string;
  children: ReactNode;
}

const NavLink = ({ path, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;


  return (
    <Button variant={pathname.startsWith(path) ? 'secondary' : 'ghost'} asChild>
      <Link href={path}>{children}</Link>
    </Button>
  );
};



const Header = () => {

  const pathname = usePathname();
  // Don't render the header if the user is on the sign-in page
  if (pathname === '/auth/sign-in') {
    return null;
  }

  const isAdmin = !pathname.includes('/leaves/NO');

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/'); // Split pathname into segments
      if (segments.length >= 2) {
        const userId = segments[segments.length - 1]; // Get the second-to-last segment
        setUserId(userId);
      }
    }
  }, [pathname]);

  return (
    <nav className="flex items-center space-x-4 p-4 shadow-md">
        <Image
          priority
          src="/assets/images/logo.png"
          alt="Absence Management"
          width={50}
          height={50}
        ></Image>
      {isAdmin && <NavLink path={`/admin/leaves/YES,${userId}`}>Admin</NavLink>}
      {!isAdmin &&<NavLink path={`/leaves/${userId}`}>Documents</NavLink>}
      {isAdmin &&<NavLink path={`/admin/leaves/${userId}/approved`}>APPROVED </NavLink>}
      {!isAdmin && <NavLink path={`/admin/leaves/${userId}/approved`}>APPROVED </NavLink>}
      {isAdmin &&<NavLink path={`/admin/leaves/${userId}/rejected`}>REJECTED </NavLink>}
      {!isAdmin &&<NavLink path={`/admin/leaves/${userId}/rejected`}>REJECTED </NavLink>}

     
      <div className="!ml-auto h-[40px] w-[1px] bg-gray-300"></div>

      <AuthMenu></AuthMenu>

      {/* <NavLink path="/articles">Articles</NavLink>
      <NavLink path="/announcements">Announcements</NavLink> */}
    </nav>
  );
};

export default Header;
