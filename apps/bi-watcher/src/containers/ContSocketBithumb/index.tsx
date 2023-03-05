import CandleStickChart from '@/components/CandleStickChart';
import { useEffect, useRef, useState } from 'react';

const END_POINT = 'wss://pubwss.bithumb.com/pub/ws';

type TProps = {
    //
};

/**
 * @see https://apidocs.bithumb.com/reference/%EB%B9%97%EC%8D%B8-%EA%B1%B0%EB%9E%98%EC%86%8C-%EC%A0%95%EB%B3%B4-%EC%88%98%EC%8B%A0
 * @param
 * @returns
 */
const ContSocketBithumb: React.FC<TProps> = () => {
    const socket = useRef<WebSocket | null>(null);
    const [chartProps, setChartProps] = useState<Array<[string, number, number, number, number]>>(
        [],
    );

    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket(END_POINT);
            socket.current.onopen = () => {
                console.log('Bithumb Connected !!!' + END_POINT);

                //TMP
                socket.current?.send(
                    JSON.stringify({
                        type: 'ticker',
                        symbols: ['BTC_KRW'], //['BTC_KRW', 'ETH_KRW'],
                        tickTypes: ['30M'], //['30M', '1H', '12H', '24H', 'MID'],
                    }),
                );
            };

            socket.current.onmessage = (event) => {
                const json: TBithumbTicker = JSON.parse(event.data);
                if (!json.content) return;

                const now = parserTime(json.content?.date, json.content?.time);
                const nowPrice = Number(json.content?.closePrice);

                setChartProps((prev) => {
                    const copyPrev = [...prev];
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
    }, []);

    return (
        <>
            <CandleStickChart series={[{ name: 'bithumb', data: chartProps }]} />
        </>
    );
};

export default ContSocketBithumb;

const parserTime = (dateString, timeString) => {
    if (!dateString || !timeString) return '';
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = timeString.slice(0, 2);
    const minute = timeString.slice(2, 4);
    // const second = timeString.slice(4,6)
    return `${year}-${month}-${day} ${hour}:${minute}`;
};
