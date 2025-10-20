import 'server-only';

import { db } from '@/lib/firebase/firebase-admin';
import type { Playground } from '@/lib/playground/types';

export async function getPlayground(id: string) {
  const project = await db.collection('playgrounds').doc(id).get();
  return project.data() as Playground;
}
