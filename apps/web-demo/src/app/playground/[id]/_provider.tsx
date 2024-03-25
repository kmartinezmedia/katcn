import { createContext, useEffect, useState } from 'react';

type DataContext = { css: string; js: string; socket: WebSocket | null };
type SocketContext = WebSocket | null;
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const defaultDataContext = {
  css: '',
  js: '',
  socket: null as WebSocket | null,
};
const defaultSocketContext = null;
const noop = () => {};

export const PlaygroundSocketContext =
  createContext<SocketContext>(defaultSocketContext);
export const PlaygroundDataContext = createContext(defaultDataContext);
export const SetPlaygroundSocketContext =
  createContext<SetState<SocketContext>>(noop);
export const SetPlaygroundDataContext =
  createContext<SetState<DataContext>>(noop);

export function PlaygroundProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<DataContext>(defaultDataContext);
  const [socket, setSocket] = useState<WebSocket | null>(defaultSocketContext);

  return (
    <PlaygroundDataContext.Provider value={data}>
      <SetPlaygroundDataContext.Provider value={setData}>
        <PlaygroundSocketContext.Provider value={socket}>
          <SetPlaygroundSocketContext.Provider value={setSocket}>
            {children}
          </SetPlaygroundSocketContext.Provider>
        </PlaygroundSocketContext.Provider>
      </SetPlaygroundDataContext.Provider>
    </PlaygroundDataContext.Provider>
  );
}
