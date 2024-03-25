'use server';

import { getId } from '@/actions/id';
import { Editor } from '@/ui/editor';
import dtsLibs from 'server/dist/dtsLibs.json';

const socketUrl = process.env.SOCKET_URL;

export default async function Home() {
  const userId = await getId();

  return <Editor socketUrl={socketUrl} userId={userId} dtsLibs={dtsLibs} />;
}
