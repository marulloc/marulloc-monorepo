/**
 * 2023.03.03 기준
 */
type TBithumbTicker = {
    type: 'ticker';
    content: {
        symbol: string; // 통화코드 (ex BTC_KRW)
        tickType: '30M' | '1H' | '12H' | '24H' | 'MID'; // 변동 기준시간- 30M, 1H, 12H, 24H, MID
        date: string; // '20200129'; // 일자 - YYYYMMDD
        time: string; //'121844'; // 시간 - HHMMSS
        openPrice: string; // '2302'; // 시가
        closePrice: string; // '2317'; // 종가
        lowPrice: string; // '2272'; // 저가
        highPrice: string; // '2344'; // 고가
        value: string; // '2831915078.07065789'; // 누적거래금액
        volume: string; // '1222314.51355788'; // 누적거래량
        sellVolume: string; // '760129.34079004'; // 매도누적거래량
        buyVolume: string; // '462185.17276784'; // 매수누적거래량
        prevClosePrice: string; // '2326'; // 전일종가
        chgRate: string; // '0.65'; // 변동률
        chgAmt: string; // '15'; // 변동금액
        volumePower: string; // '60.80'; // 체결강도
    };
};
