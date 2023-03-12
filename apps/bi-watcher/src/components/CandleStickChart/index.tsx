import Highcharts, { Options } from 'highcharts/highstock';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import React from 'react';

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
}

type TProps = {
    series: Array<{
        name: string;
        data: Array<[number | string, number, number, number, number]>;
    }>;
};

const CandleStickChart: React.FC<TProps> = ({ series }) => {
    const options: Options = useMemo(
        () => ({
            title: {
                text: 'Candlestick and Heiken Ashi series comparison.',
                align: 'left',
            },
            chart: { height: '100%' },

            // rangeSelector: {
            //     selected: 1,
            // },
            yAxis: [
                {
                    title: {
                        text: series.length >= 1 ? series[0].name : '',
                    },
                    height: '33%',
                },
                {
                    title: {
                        text: series.length >= 2 ? series[1].name : '',
                    },
                    top: '33%',
                    height: '33%',
                    offset: 0,
                },
                {
                    title: {
                        text: series.length >= 3 ? series[2].name : '',
                    },
                    top: '66%',
                    height: '34%',
                    offset: 0,
                },
            ],
            series: [
                {
                    type: 'candlestick',
                    name: series.length >= 1 ? series[0].name : '',
                    data: series.length >= 1 ? series[0].data : [],
                },
                {
                    type: 'candlestick',
                    name: series.length >= 2 ? series[1].name : '',
                    data: series.length >= 2 ? series[1].data : [],
                    yAxis: 1,
                },
                {
                    type: 'candlestick',
                    name: series.length >= 3 ? series[2].name : '',
                    data: series.length >= 3 ? series[2].data : [],
                    yAxis: 2,
                },
            ],
        }),
        [series],
    );

    return (
        <div style={{ height: '50vh' }}>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
        </div>
    );
};

export default React.memo(CandleStickChart);
