import { useEffect, useRef } from 'react';

const END_POINT = 'wss://api.upbit.com/websocket/v1';

const ContSocketUpbit: React.FC = () => {
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket(END_POINT);
            socket.current.onopen = () => {
                console.log('!!! Connected !!!' + END_POINT);

                const subscriptionMessage = JSON.stringify([
                    { ticket: 'UNIQUE_TICKET' }, //ticket으로 그분해야되네
                    { type: 'orderbook', codes: ['KRW-BTC'] },
                ]);
                socket.current?.send(subscriptionMessage);
            };
            // socket.current.onerror = (_error) => {};

            socket.current.onmessage = (event) => {
                if (event.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const json = JSON.parse(reader.result as string);
                        console.log('@@@@', json);
                        // TODO : processing
                    };
                    reader.readAsText(event.data);
                } else {
                    // TODO : processing
                }
            };
        }

        return () => {
            if (socket.current) socket.current?.close();
        };
    }, []);

    return <></>;
};

export default ContSocketUpbit;
