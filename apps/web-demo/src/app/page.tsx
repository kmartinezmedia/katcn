'use server';

import { getId } from '../actions/id';
import { Editor } from '@/ui/editor';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const serverUrl = process.env.SERVER_URL!;

export default async function Home() {
  const userId = await getId();
  try {
    const [dtsLibs] = await Promise.all([
      fetch(`${serverUrl}/dist/dtsLibs.json`, {
        method: 'GET',
      }).then((res) => res.json()),
    ]);
    console.log('SERVER_URL', serverUrl);

    return <Editor serverUrl={serverUrl} userId={userId} dtsLibs={dtsLibs} />;
  } catch (e) {
    console.error(e);
  }
}
