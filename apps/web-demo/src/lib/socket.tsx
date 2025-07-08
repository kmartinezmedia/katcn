'use client';

import { useParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import {
  SetPlaygroundDataContext,
  SetPlaygroundSocketContext,
} from '@/lib/context';

interface SocketProps {
  url: string;
}

export default function Socket({ url }: SocketProps) {
  const { id } = useParams();
  const setSocket = useContext(SetPlaygroundSocketContext);
  const setData = useContext(SetPlaygroundDataContext);

  useEffect(() => {
    if (id) {
      const socketUrl = `${url}/${id}`;
      const websocket = new WebSocket(socketUrl);
      setSocket(websocket);
      websocket.onmessage = async (ev) => {
        const data = JSON.parse(ev.data);
        setData(data);
      };

      websocket.onclose = () => {
        websocket.close();
      };

      websocket.onerror = (error) => {
        throw error;
      };

      return () => {
        if (websocket.readyState === 1) {
          websocket.close();
        }
      };
    }
  }, [id, url, setSocket, setData]);

  return null;
}
