import { useEffect, useRef } from 'react';

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

    // Init
    useEffect(() => {
        if (socket.current) socket.current.close();
        else {
            socket.current = new WebSocket(END_POINTS[exchange]);
            socket.current.onopen = () => console.log(`[${exchange}] successfully connected !!`);
        }

        return () => {
            if (socket.current) socket.current?.close();
        };
    }, [exchange]);

    return socket.current;
};

export default useSocketConnect;
