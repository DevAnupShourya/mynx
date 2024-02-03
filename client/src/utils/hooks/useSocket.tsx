import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

import useGetCookie from "~/utils/hooks/useGetCookie";
import Socket_Events from "~/utils/raw_data/Socket.io";

const socketUrl = import.meta.env.VITE_API_URL;

function useSocket() {
  const token = useGetCookie();
  const [isSocketOnline, setIsSocketOnline] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const url = socketUrl.replace("v1", "");
    const newSocket = io(url, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(newSocket);

    newSocket.on(Socket_Events.SOCKET_CONNECT, onSocketConnect);
    newSocket.on(Socket_Events.SOCKET_DISCONNECT, () => {
      onSocketDisconnect();
      setTimeout(() => {
        console.log("Attempt to reconnect after 5 seconds");
        newSocket.connect();
      }, 5000);
    });
    newSocket.on(Socket_Events.SOCKET_ERROR_CONNECT, (err) =>
      onSocketErrorConnect(err)
    );
    newSocket.on(Socket_Events.SOCKET_ERROR_FAILED, (err) =>
      onSocketErrorFailed(err)
    );

    return () => {
      newSocket.off(Socket_Events.SOCKET_CONNECT);
      newSocket.off(Socket_Events.SOCKET_DISCONNECT);
      newSocket.off(Socket_Events.SOCKET_ERROR_CONNECT);
      newSocket.off(Socket_Events.SOCKET_ERROR_FAILED);
    };
  }, [token]);

  const onSocketConnect = () => {
    console.log(`✔ Connected with socket successfully.`);
    setIsSocketOnline(true);
  };

  function onSocketDisconnect() {
    console.warn(`📌Socket disconnected!`);
    setIsSocketOnline(false);
  }
  function onSocketErrorConnect(err: Error) {
    console.error(`‼ Socket Connect Error : ${err.message}`);
    setIsSocketOnline(false);
  }
  function onSocketErrorFailed(err: Error) {
    console.error(`‼ Socket Failed Error : ${err.message}`);
    setIsSocketOnline(false);
  }

  return { socket, isSocketOnline };
}

export default useSocket;
