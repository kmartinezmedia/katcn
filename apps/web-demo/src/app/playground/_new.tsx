'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setId } from '@/actions/id';

export default function NewUser() {
  const router = useRouter();
  useEffect(() => {
    setId().then((val) => {
      router.push(`/playground/${val}/preview`);
    });
  }, [router.push]);

  return null;
}
