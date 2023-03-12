import useSocketConnect from '@/hooks/useSocketConnect';
import { useEffect, useLayoutEffect } from 'react';

const CandleStickContainer: React.FC = () => {
    const upbit = useSocketConnect('UPBIT');
    const binance = useSocketConnect('BINANCE');
    const bithumb = useSocketConnect('BITHUMB');

    // upbit ticker
    useLayoutEffect(() => {
        console.log('!!!. in Layout', upbit);
    }, [upbit]);

    useEffect(() => {
        console.log('!!!. in efe', upbit);
    }, [upbit]);
    return <>asd</>;
};

export default CandleStickContainer;
