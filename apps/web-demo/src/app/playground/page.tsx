import { redirect } from 'next/navigation';
import { getId } from '@/actions/id';
import NewUser from './_new';

export default async function Page() {
  const id = await getId();
  if (id) {
    redirect(`/playground/${id}/preview`);
  }
  return <NewUser />;
}
