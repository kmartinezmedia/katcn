'use server';

import { getId } from '../actions/id';
import { Editor } from '@/ui/editor';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const serverUrl = process.env.SERVER_URL!;

export default async function Home() {
  const userId = await getId();
  const dtsLibs = await fetch(`${serverUrl}/dist/dtsLibs.json`, {
    method: 'GET',
  }).then((res) => res.json());

  return <Editor serverUrl={serverUrl} userId={userId} dtsLibs={dtsLibs} />;
}
