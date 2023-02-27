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
            socket.current.onerror = (error) => {
                console.log('!!! Connection Error', error);
            };
            socket.current.onmessage = (what) => {
                handleData(what.data);
            };
        }

        return () => {
            socket.current?.close();
        };
    }, []);

    const handleData = (blob) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            try {
                const json = JSON.parse(reader.result as string);
                console.log('!!!!', json);
                // TODO: JSON 데이터 처리
            } catch (error) {
                console.error('Error parsing JSON', error);
            }
        });
        reader.readAsText(blob);
    };

    return <></>;
};

export default ContSocketUpbit;
