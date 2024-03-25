import { getId } from '@/actions/id';
import { redirect } from 'next/navigation';
import NewUser from './_new';

interface PlaygroundParams {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PlaygroundParams) {
  const id = await getId();
  if (id) {
    redirect(`/playground/${id}/preview`);
  }
  return <NewUser />;
}
