import 'server-only';

import { db } from '@/lib/firebase/firebase-admin';
import type { Playground } from '@/playground/types';

export async function getPlayground(id: string) {
  const project = await db.collection('playground').doc(id).get();
  return project.data() as Playground;
}
