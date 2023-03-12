import useSocketConnect from '@/hooks/useSocketConnect';
import { unixTimestampParser } from '@/utils/parsers/\bunixTimestampParser';
import bithumbTimeParser from '@/utils/parsers/bithumbTimeParser';
import { useEffect, useState } from 'react';

type TCandleStick = Array<[number, number, number, number, number]>;
// type TExchangeCandleSticks = { [key in TCryptoExchange]: TCandleStick };

const CandleStickContainer: React.FC = () => {
    const upbit = useSocketConnect('UPBIT');
    const binance = useSocketConnect('BINANCE');
    const bithumb = useSocketConnect('BITHUMB');

    const [upbitCandles, setUpbitCandes] = useState<TCandleStick>([]);
    const [binanceCandles, setBinanceCandles] = useState<TCandleStick>([]);
    const [bithumbCandles, setBithumbCandes] = useState<TCandleStick>([]);

    useEffect(() => {
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

        // const streamConfig = useMemo(() => {
        //     const sc: Array<
        //         { ticket: string } | { type: TProps['stream'][number]; codes: TProps['crypto'] }
        //     > = [{ ticket: 'bi-watcher-upbit' }];

        //     if (stream.includes('ticker')) sc.push({ type: 'ticker', codes: [...crypto] });
        //     if (stream.includes('orderbook')) sc.push({ type: 'orderbook', codes: [...crypto] });
        //     if (stream.includes('trade')) sc.push({ type: 'trade', codes: [...crypto] });
        //     return sc;
        // }, [crypto, stream]);
    }, [upbit]);

    useEffect(() => {
        if (!bithumb) return;

        bithumb.onmessage = (event) => {
            const json: TBithumbTicker = JSON.parse(event.data);
            if (!json.content) return;

            const now = bithumbTimeParser(json.content?.date, json.content?.time);
            const nowPrice = Number(json.content?.closePrice);

            setBithumbCandes((prevCandles) => {
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

        bithumb.send(
            JSON.stringify({
                type: 'ticker',
                symbols: ['BTC_KRW'], //['BTC_KRW', 'ETH_KRW'],
                tickTypes: ['30M'], //['30M', '1H', '12H', '24H', 'MID'],
            }),
        );
    }, [bithumb]);

    useEffect(() => {
        if (!binance) return;

        binance.onmessage = (event) => {
            const data: TBinanceTicker = JSON.parse(event.data);
            if (!data) return;

            const now = unixTimestampParser(data.E);
            const nowPrice = Number(data.c);

            if (isNaN(nowPrice)) return;

            setBinanceCandles((prevCandles) => {
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

        binance.send(
            JSON.stringify({
                method: 'SUBSCRIBE',
                params: [
                    'btcusdt@ticker',
                    // 'btcusdt@depth'
                ],
                id: 1,
            }),
        );
    }, [binance]);

    return <>asd</>;
};

export default CandleStickContainer;
