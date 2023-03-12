type TCryptoExchange = 'upbit' | 'binance' | 'bithumb';
export type TCandleStick = Array<[number, number, number, number, number]>;
type TExchangeCandleSticks = { [key in TCryptoExchange]: TCandleStick };
