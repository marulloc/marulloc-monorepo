import { io } from 'socket.io-client';
import { useEffect } from 'react';
import axios from 'axios';

const ContSocketUpbit: React.FC = () => {
    useEffect(() => {
        // for Test

        async () => {
            const { data } = await axios.get('http://localhost:3001/api/hello');
            console.log(data);
        };
    }, []);
    useEffect(() => {
        const socket = io('/upbit');

        // socket.on('connect', () => alert('Connected'));

        socket.on('connect', () => {
            socket.emit('subscribe', [
                { ticket: 'UNIQUE_TICKET' },
                { type: 'orderbook', codes: ['KRW-BTC', 'BTC-XRP'] },
            ]);
        });

        socket.on('message', (data) => {
            console.log('!!!! Received', data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return <></>;
};

export default ContSocketUpbit;
