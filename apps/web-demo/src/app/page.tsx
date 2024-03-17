'use server';

import { getId } from '../actions/id';
import { Editor } from '@/ui/editor';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const serverUrl = process.env.SERVER_URL!;

export default async function Home() {
  const userId = await getId();
  let dtsLibs = [];
  try {
    const dtsLibsResp = await fetch(`${serverUrl}/dtsLibs`, {
      method: 'GET',
      // cache: 'no-store',
    });
    dtsLibs = await dtsLibsResp.json();
  } catch (e) {
    console.error(e);
  }

  console.log('SERVER_URL', serverUrl);

  return <Editor serverUrl={serverUrl} userId={userId} dtsLibs={dtsLibs} />;
}
