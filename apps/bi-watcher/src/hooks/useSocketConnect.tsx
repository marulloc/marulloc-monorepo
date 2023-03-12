import { useEffect, useRef, useState } from 'react';

const END_POINTS = {
    BITHUMB: 'wss://pubwss.bithumb.com/pub/ws',
    BINANCE: 'wss://stream.binance.com:9443/ws',
    UPBIT: 'wss://api.upbit.com/websocket/v1',
};

type TProps = {
    cryptoExchange: keyof typeof END_POINTS;
    onOpen?: () => void;
};

const useSocketConnect = (exchange: TProps['cryptoExchange']): WebSocket | null => {
    const socket = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        socket.current?.close();

        const newSocket = new WebSocket(END_POINTS[exchange]);
        newSocket.onopen = () => {
            console.log(`[${exchange}] successfully connected !!`);
            setIsConnected(true);
        };
        socket.current = newSocket;

        return () => socket.current?.close();
    }, [exchange]);

    return isConnected ? socket.current : null;
};

export default useSocketConnect;
