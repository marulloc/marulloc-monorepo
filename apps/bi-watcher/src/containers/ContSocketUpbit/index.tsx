import CandleStickChart from '@/components/CandleStickChart';
import upbitTimeParser from '@/utils/parsers/upbitTimeParser';
import { useEffect, useMemo, useRef, useState } from 'react';

const END_POINT = 'wss://api.upbit.com/websocket/v1';

type TProps = {
    crypto: Array<string>; // TODO : Typing
    stream: Array<'ticker' | 'orderbook' | 'trade'>;
    //children
};

/**
 * @see https://docs.upbit.com/docs/upbit-quotation-websocket
 * @param param0
 * @returns
 */
const ContSocketUpbit: React.FC<TProps> = ({ crypto, stream }) => {
    const socket = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const [candles, setCandles] = useState<Array<[string, number, number, number, number]>>([]);

    /** 2023.02.27 조병건
     *  Initialize  */
    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket(END_POINT);
            socket.current.onopen = () => {
                console.log('Upbit Connected !!!' + END_POINT);
                setIsConnected(true);
            };
            // socket.current.onerror = (_error) => {};

            socket.current.onmessage = (event) => {
                if (event.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const json: TUpbitTicker = JSON.parse(reader.result as string);

                        const now = upbitTimeParser(json.timestamp);
                        const nowPrice = json.trade_price;

                        if (!now || !nowPrice) return;

                        setCandles((prevCandles) => {
                            const copyPrev = [...prevCandles];
                            const lastCandle = copyPrev.pop();
                            if (!lastCandle)
                                return [[now as string, nowPrice, nowPrice, nowPrice, nowPrice]];

                            const [lastTime, lastOpen, lastHigh, lastLow, lastClose] = lastCandle;

                            if (lastTime === now) {
                                return [
                                    ...copyPrev,
                                    [
                                        lastTime as string,
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
                                    [now as string, lastClose, nowPrice, nowPrice, nowPrice],
                                ];
                            }
                        });
                    };
                    reader.readAsText(event.data);
                } else {
                    // TODO : processing
                }
            };
            socket.current.onclose = () => {
                // TODO : connect Again when Closed
            };
        }

        return () => {
            if (socket.current) socket.current?.close();
        };
    }, []);

    const streamConfig = useMemo(() => {
        const sc: Array<
            { ticket: string } | { type: TProps['stream'][number]; codes: TProps['crypto'] }
        > = [{ ticket: 'bi-watcher-upbit' }];

        if (stream.includes('ticker')) sc.push({ type: 'ticker', codes: [...crypto] });
        if (stream.includes('orderbook')) sc.push({ type: 'orderbook', codes: [...crypto] });
        if (stream.includes('trade')) sc.push({ type: 'trade', codes: [...crypto] });
        return sc;
    }, [crypto, stream]);

    useEffect(() => {
        if (!socket.current || !isConnected) return;
        socket.current.send(JSON.stringify(streamConfig));
    }, [streamConfig, isConnected]);

    return (
        <>
            <CandleStickChart series={[{ name: 'upbit', data: candles }]} />
        </>
    );
};

export default ContSocketUpbit;
