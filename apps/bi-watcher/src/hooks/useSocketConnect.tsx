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
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        setSocket((prevSocket) => {
            prevSocket?.close();

            const newSocket = new WebSocket(END_POINTS[exchange]);
            newSocket.onopen = () => console.log(`[${exchange}] successfully connected !!`);
            return newSocket;
        });

        return () =>
            setSocket((prevSocket) => {
                prevSocket?.close();
                return null;
            });
    }, [setSocket, exchange]);

    return socket;
};

export default useSocketConnect;
