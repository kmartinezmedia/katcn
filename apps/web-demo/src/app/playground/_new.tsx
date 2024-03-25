'use client';

import { setId } from '@/actions/id';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewUser() {
  const router = useRouter();
  useEffect(() => {
    setId().then((val) => {
      router.push(`/playground/${val}/preview`);
    });
  }, [router.push]);

  return null;
}
