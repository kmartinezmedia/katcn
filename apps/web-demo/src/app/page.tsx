import { redirect } from 'next/navigation';
import { createPlayground } from '@/actions/create-playground';

export default async function Home() {
  const { id } = await createPlayground();
  return redirect(`/playground/${id}`);
}
