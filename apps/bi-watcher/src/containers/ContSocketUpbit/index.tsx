import { useEffect, useMemo, useRef, useState } from 'react';

const END_POINT = 'wss://api.upbit.com/websocket/v1';

type TProps = {
    crypto: Array<string>; // TODO : Typing
    stream: Array<'ticker' | 'orderbook' | 'trade'>;
    //children
};

const thirteenStampParser = (timestamp) => {
    const eraseMilSecTimeStamp = Math.floor(timestamp / 1000) * 1000;

    const date = new Date(eraseMilSecTimeStamp);
    const year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    const month = ('0' + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    const day = ('0' + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    const hour = ('0' + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    const minute = ('0' + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    const second = ('0' + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

    return `${year}-${month}-${day} ${hour}:${minute}`;
    return eraseMilSecTimeStamp;
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
    const [chartProps, setChartProps] = useState<Array<Array<number>>>([]);

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

                        const now = thirteenStampParser(json.timestamp);
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
                        console.log('???', candleRef.current);
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
            <TestCharts chartProps={chartProps} />
        </>
    );
};

export default ContSocketUpbit;

import Highcharts from 'highcharts/highstock';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { timeStamp } from 'console';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
}
/**
 * TEST Ticker Chart
 * @returns
 */

const TestCharts = ({ chartProps }) => {
    // const o

    const options = useMemo(
        () => ({
            title: {
                text: 'My stock chart',
            },
            series: [
                {
                    type: 'candlestick',
                    name: 'Upbit',
                    data: [...chartProps],
                },
            ],
        }),
        [chartProps],
    );

    return (
        <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
    );
};
