'use client';

import CreateLeave from '@/features/leaves/components/CreateLeave';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NewLeavePage = () => {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/'); // Split pathname into segments
      if (segments.length >= 2) {
        const userId = segments[segments.length - 2]; // Get the second-to-last segment
        setUserId(userId);
      }
    }
  }, [pathname]);

  return userId ? <CreateLeave userId={"NO,"+userId} /> : <div>Loading...</div>;
};

export default NewLeavePage;
