const bithumbTimeParser = (dateString: string, timeString: string) => {
    if (!dateString || !timeString) return '';
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = timeString.slice(0, 2);
    const minute = timeString.slice(2, 4);
    // const second = timeString.slice(4,6)
    return `${year}-${month}-${day} ${hour}:${minute}`;
};

export default bithumbTimeParser;
