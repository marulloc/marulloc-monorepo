/**
 * 2023.03.03 기준
 */
type TUpbitTicker = {
    type: 'ticker'; // ty 타입
    code: string; // cd 마켓 코드 (ex. KRW-BTC)
    opening_price: number; //op	시가	Double
    high_price: number; // hp	고가	Double
    low_price: number; //lp	저가	Double
    trade_price: number; //tp	현재가	Double
    prev_closing_price: number; //	pcp	전일 종가	Double
    change: 'RISE' | 'EVEN' | 'FALL'; // c 전일 대비 	RISE : 상승 EVEN : 보합 FALL : 하락
    change_price: number; //cp	부호 없는 전일 대비 값	Double
    signed_change_price: number; //scp	전일 대비 값	Double
    change_rate: number; //cr	부호 없는 전일 대비 등락율	Double
    signed_change_rate: number; //scr	전일 대비 등락율	Double
    trade_volume: number; //tv	가장 최근 거래량	Double
    acc_trade_volume: number; //atv	누적 거래량(UTC 0시 기준)	Double
    acc_trade_volume_24h: number; //atv24h	24시간 누적 거래량	Double
    acc_trade_price: number; //atp	누적 거래대금(UTC 0시 기준)	Double
    acc_trade_price_24h: number; //atp24h	24시간 누적 거래대금	Double
    trade_date: string; //tdt	최근 거래 일자(UTC)	String	yyyyMMdd
    trade_time: string; // ttm	최근 거래 시각(UTC)	String	HHmmss
    trade_timestamp: number; //ttms	체결 타임스탬프 (milliseconds)	Long
    ask_bid: 'ASK' | 'BID'; // ab	매수/매도 구분	String	ASK : 매도 BID : 매수
    acc_ask_volume: number; //aav	누적 매도량	Double
    acc_bid_volume: number; //abv	누적 매수량	Double
    highest_52_week_price: number; //	h52wp	52주 최고가	Double
    highest_52_week_date: string; // h52wdt	52주 최고가 달성일	String	yyyy-MM-dd
    lowest_52_week_price: number; //	l52wp	52주 최저가	Double
    lowest_52_week_date: string; //l52wdt	52주 최저가 달성일	String	yyyy-MM-dd
    trade_status: string; // ts	거래상태 *deprecated:	String
    market_state: 'PREVIEW' | 'ACTIVE' | 'DELISTED'; //ms	거래상태	String	PREVIEW : 입금지원 ACTIVE : 거래지원가능 DELISTED : 거래지원종료
    market_state_for_ios: string; // msfi	거래 상태 *deprecated	String
    is_trading_suspended: boolean; //	its	거래 정지 여부	Boolean
    delisting_date: string; //dd	상장폐지일	Date
    market_warning: 'NONE' | 'CAUTION'; //mw	유의 종목 여부	String	NONE : 해당없음 CAUTION : 투자유의
    timestamp: number; //	tms	타임스탬프 (millisecond)	Long
    stream_type: 'SNAPSHOT' | 'REALTIME'; // st	스트림 타입	String	SNAPSHOT : 스냅샷 REALTIME : 실시간
};
