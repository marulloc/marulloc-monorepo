import useSocketConnect from '@/hooks/useSocketConnect';
import { unixTimestampParser } from '@/utils/parsers/\bunixTimestampParser';
import { useEffect, useState } from 'react';

const CandleStickContainer: React.FC = () => {
    const upbit = useSocketConnect('UPBIT');
    const binance = useSocketConnect('BINANCE');
    const bithumb = useSocketConnect('BITHUMB');

    const [upbitCandles, setUpbitCandes] = useState<
        Array<[number, number, number, number, number]>
    >([]);

    useEffect(() => {
        console.log(upbit);
        if (!upbit) return;

        upbit.onmessage = (event) => {
            if (!(event.data instanceof Blob)) return;

            const reader = new FileReader();
            reader.onload = () => {
                const json: TUpbitTicker = JSON.parse(reader.result as string);

                const now = unixTimestampParser(json.timestamp);
                const nowPrice = json.trade_price;

                if (!now || !nowPrice) return;

                setUpbitCandes((prevCandles) => {
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

            reader.readAsText(event.data);
        };

        upbit.send(
            JSON.stringify([
                { ticket: 'bi-watcher-upbit2' },
                { type: 'ticker', codes: ['KRW-BTC'] },
            ]),
        );
    }, [upbit]);

    console.log(upbitCandles);
    return <>asd</>;
};

export default CandleStickContainer;
