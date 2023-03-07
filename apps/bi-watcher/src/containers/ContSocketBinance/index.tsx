import { useEffect, useRef } from 'react';

const coin = 'btcusdt';
// const END_POINT = `wss://fstream.binance.com/ws/${coin}@ticker`; //ticker

/**
 *  {
    "e": "24hrMiniTicker",  // Event type
    "E": 1672515782136,     // Event time
    "s": "BNBBTC",          // Symbol
    "c": "0.0025",          // Close price
    "o": "0.0010",          // Open price
    "h": "0.0025",          // High price
    "l": "0.0010",          // Low price
    "v": "10000",           // Total traded base asset volume
    "q": "18"               // Total traded quote asset volume
  }
 */
type TProps = {
    //
};

/**
 * @description 얘네는 엔드포인트 기준으로 나눈다.
 * @see https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream
 * @returns
 */
const ContSocketBinance: React.FC<TProps> = () => {
    const socket = useRef<WebSocket | null>(null);

    const END_POINT1 = 'wss://stream.binance.com:9443/ws';
    // const END_POINT1 = 'wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker';
    // const END_POINT2 = 'wss://ws-api.binance.com:443/ws-api/v3/btcusdt@ticker';

    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket(END_POINT1);
            socket.current.onopen = () => {
                console.log('Binance Connected !!!' + END_POINT1);

                socket.current?.send(
                    JSON.stringify({
                        method: 'SUBSCRIBE',
                        params: [
                            'btcusdt@ticker',
                            // 'btcusdt@depth'
                        ],
                        id: 1,
                    }),
                );
            };

            socket.current.onmessage = (event) => {
                console.log('[BINANCE]', JSON.parse(event.data));
            };
        }
    }, []);

    return <></>;
};

export default ContSocketBinance;
