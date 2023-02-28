import { useEffect, useRef } from 'react';

const coin = 'btcusdt';
const END_POINT = `wss://fstream.binance.com/ws/${coin}@trade`;

type TProps = {
    //
};

/**
 * @description 얘네는 엔드포인트 기준으로 나눈다.
 * @see https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md
 * @returns
 */
const ContSocketBinance: React.FC<TProps> = () => {
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket(END_POINT);
            socket.current.onopen = () => {
                console.log('Binance Connected !!!' + END_POINT);

                //TMP
                // socket.current?.send(
                //     JSON.stringify({
                //         id: '043a7cf2-bde3-4888-9604-c8ac41fcba4d',
                //         method: 'ticker.price',
                //         params: {
                //             symbol: 'BNBBTC',
                //         },
                //     }),
                // );
            };

            socket.current.onmessage = (event) => {
                console.log('[BINANCE]', JSON.parse(event.data));
            };
        }
    }, []);

    return <></>;
};

export default ContSocketBinance;
