import { NextResponse } from 'next/server';
import { transformPlaygroundCode } from '@/actions/transform-playground-code';

import { db } from '@/lib/firebase/firebase-admin';

export async function PUT(request: Request) {
  const formData = await request.formData();
  const id = formData.get('id') as string;
  const jsInput = formData.get('jsInput') as string;

  const transformedData = await transformPlaygroundCode({
    id,
    jsInput,
  });

  await db.doc(`playgrounds/${id}`).update({
    jsInput,
    ...transformedData,
  });
  return NextResponse.json({ message: 'Playground updated' });
}
