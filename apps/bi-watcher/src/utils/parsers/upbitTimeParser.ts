const upbitTimeParser = (timestamp: number) => {
    const eraseMilSecTimeStamp = Math.floor(timestamp / 1000) * 1000;

    const date = new Date(eraseMilSecTimeStamp);
    const year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    const month = ('0' + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    const day = ('0' + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    const hour = ('0' + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    const minute = ('0' + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    // const second = ('0' + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

    return `${year}-${month}-${day} ${hour}:${minute}`;
};

export default upbitTimeParser;
