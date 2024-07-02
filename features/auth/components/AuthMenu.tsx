'use client';
import { Avatar, AvatarImage } from '@/features/shadcn/components/ui/avatar';
import { Button } from '@/features/shadcn/components/ui/button';
import { useState } from 'react';
import Hamburger from 'hamburger-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/shadcn/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');

    // Perform any logout-related actions here if needed
    router.push('/auth/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent>
        <DropdownMenuLabel>Documents</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthMenu;
