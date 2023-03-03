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
                        // TODO : processing

                        // Ticker
                        // console.log('[UPBIT]', json);
                        // console.log('[UPBIT]', json.stream_type);
                        console.log('[UPBIT]', json.trade_price);
                        // console.log('[UPBIT]', json.timestamp);

                        const date = new Date(json.timestamp);
                        const year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
                        const month = ('0' + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
                        const day = ('0' + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
                        const hour = ('0' + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
                        const minute = ('0' + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
                        const second = ('0' + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

                        console.log({
                            year,
                            month,
                            day,
                            hour,
                            minute,
                            second,
                            price: json.trade_price,
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

    return <></>;
};

export default ContSocketUpbit;
