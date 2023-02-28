import { useEffect, useRef } from 'react';

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

    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket(END_POINT);
            socket.current.onopen = () => {
                console.log('Bithumb Connected !!!' + END_POINT);

                //TMP
                socket.current?.send(
                    JSON.stringify({
                        type: 'ticker',
                        symbols: ['BTC_KRW', 'ETH_KRW'],
                        tickTypes: ['30M', '1H', '12H', '24H', 'MID'],
                    }),
                );
            };

            socket.current.onmessage = (event) => {
                console.log('[BITHUMB]', JSON.parse(event.data));
            };
        }
    }, []);
    return <></>;
};

export default ContSocketBithumb;
