export type PlaygroundPageProps = {
  params: { id: string };
  searchParams: { hash: string };
};
export type PlaygroundData = { css: string; js: string; hash: string };
export type SocketContext = WebSocket | null;
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
