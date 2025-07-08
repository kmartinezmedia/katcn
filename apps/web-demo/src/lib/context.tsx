'use client';

import { ThemeProvider } from 'next-themes';
import { createContext, useState } from 'react';
import Socket from './socket';

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

interface ProvidersProps extends React.PropsWithChildren {
  socketUrl: string;
}

export function Providers({ socketUrl, children }: ProvidersProps) {
  const [data, setData] = useState<DataContext>(defaultDataContext);
  const [socket, setSocket] = useState<WebSocket | null>(defaultSocketContext);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      enableColorScheme={true}
      disableTransitionOnChange
      storageKey="katcn"
      themes={['light', 'dark']}
      value={{ light: 'light', dark: 'dark' }}
    >
      <PlaygroundDataContext.Provider value={data}>
        <SetPlaygroundDataContext.Provider value={setData}>
          <PlaygroundSocketContext.Provider value={socket}>
            <SetPlaygroundSocketContext.Provider value={setSocket}>
              <Socket url={socketUrl} />
              {children}
            </SetPlaygroundSocketContext.Provider>
          </PlaygroundSocketContext.Provider>
        </SetPlaygroundDataContext.Provider>
      </PlaygroundDataContext.Provider>
    </ThemeProvider>
  );
}
