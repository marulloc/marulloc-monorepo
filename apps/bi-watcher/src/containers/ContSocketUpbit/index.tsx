import CandleStickChart from '@/components/CandleStickChart';
import thirteenTimestampParser from '@/utils/parsers/thirteenTimestampParser';
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

    const candleRef = useRef({});
    const [chartProps, setChartProps] = useState<Array<[number, number, number, number, number]>>(
        [],
    );

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

                        const now = thirteenTimestampParser(json.timestamp);
                        const nowPrice = json.trade_price;

                        if (candleRef.current['time'] === now) {
                            const prevHigh = candleRef.current['high'];
                            const prevLow = candleRef.current['low'];

                            candleRef.current = {
                                ...candleRef.current,
                                high: nowPrice > prevHigh ? nowPrice : prevHigh,
                                low: nowPrice < prevLow ? nowPrice : prevLow,
                                close: nowPrice,
                            };

                            setChartProps((prev) => {
                                const copy = [...prev];
                                copy.pop();
                                return [
                                    ...copy,
                                    [
                                        candleRef.current['time'],
                                        candleRef.current['open'],
                                        candleRef.current['high'],
                                        candleRef.current['low'],
                                        candleRef.current['close'],
                                    ],
                                ];
                            });
                        } else {
                            if (!candleRef.current['time']) {
                                candleRef.current = {
                                    time: now,
                                    open: nowPrice,
                                    high: nowPrice,
                                    low: nowPrice,
                                    close: nowPrice,
                                };
                            } else {
                                setChartProps((prev) => [
                                    ...prev,
                                    [
                                        candleRef.current['time'],
                                        candleRef.current['open'],
                                        candleRef.current['high'],
                                        candleRef.current['low'],
                                        candleRef.current['close'],
                                    ],
                                ]);
                                candleRef.current = {
                                    time: now,
                                    open: nowPrice,
                                    high: nowPrice,
                                    low: nowPrice,
                                    close: nowPrice,
                                };
                            }
                        }
                        // console.log('???', candleRef.current);
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
            <CandleStickChart series={[{ name: 'upbit', data: chartProps }]} />
        </>
    );
};

export default ContSocketUpbit;
