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

/**
 * @see_bithumb https://apidocs.bithumb.com/reference/%EB%B9%97%EC%8D%B8-%EA%B1%B0%EB%9E%98%EC%86%8C-%EC%A0%95%EB%B3%B4-%EC%88%98%EC%8B%A0
 * @see_binance https://binance-docs.github.io/apidocs/spot/en/#live-subscribing-unsubscribing-to-streams
 * @see_upbit https://docs.upbit.com/docs/upbit-quotation-websocket
 * @param exchange
 * @returns
 */
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
