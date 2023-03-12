import CandleStickChart from '@/components/CandleStickChart';
import upbitTimeParser from '@/utils/parsers/upbitTimeParser';
import { useEffect, useRef, useState } from 'react';

type TProps = {
    //
};

/**
 * @description
 * @see https://binance-docs.github.io/apidocs/spot/en/#live-subscribing-unsubscribing-to-streams
 * @returns
 */
const ContSocketBinance: React.FC<TProps> = () => {
    const socket = useRef<WebSocket | null>(null);
    const [candles, setCandles] = useState<Array<[string, number, number, number, number]>>([]);

    const END_POINT1 = 'wss://stream.binance.com:9443/ws';

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
                const data: TBinanceTicker = JSON.parse(event.data);
                if (!data) return;

                const now = upbitTimeParser(data.E);
                const nowPrice = Number(data.c);

                if (isNaN(nowPrice)) return;

                setCandles((prevCandles) => {
                    const copyPrev = [...prevCandles];
                    const lastCandle = copyPrev.pop();
                    if (!lastCandle) return [[now, nowPrice, nowPrice, nowPrice, nowPrice]];

                    const [lastTime, lastOpen, lastHigh, lastLow, lastClose] = lastCandle;

                    if (lastTime === now) {
                        return [
                            ...copyPrev,
                            [
                                lastTime,
                                lastOpen,
                                nowPrice > lastHigh ? nowPrice : lastHigh,
                                nowPrice < lastLow ? nowPrice : lastLow,
                                nowPrice,
                            ],
                        ];
                    } else {
                        return [
                            ...copyPrev,
                            lastCandle,
                            [now, lastClose, nowPrice, nowPrice, nowPrice],
                        ];
                    }
                });
            };
        }
        return () => {
            if (socket.current) socket.current?.close();
        };
    }, []);

    return (
        <>
            <CandleStickChart
                series={[
                    {
                        name: `binance btc/usdt ${
                            candles.length > 0 ? candles[candles.length - 1][4] : ''
                        }`,
                        data: candles,
                    },
                ]}
            />
        </>
    );
};

export default ContSocketBinance;
