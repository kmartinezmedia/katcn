import Socket from './_client';

export default function Page() {
  return <Socket url={process.env.SOCKET_URL} />;
}
