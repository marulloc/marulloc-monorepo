import Highcharts from 'highcharts/highstock';
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
        data: Array<[number, number, number, number, number]>;
    }>;
};

const CandleStickChart: React.FC<TProps> = ({ series }) => {
    const options = useMemo(
        () => ({
            title: { text: 'Marulloc CandleStick Test' },
            series: [...series],
        }),
        [series],
    );

    return (
        <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
    );
};

export default React.memo(CandleStickChart);
