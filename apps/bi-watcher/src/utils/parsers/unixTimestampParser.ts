export const unixTimestampParser = (unixTimestamp: number | string): number => {
    const dateObj = new Date(unixTimestamp);

    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);

    const newTimestamop = dateObj.getTime();
    return newTimestamop;
};
