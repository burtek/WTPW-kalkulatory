import type { ChartData } from 'chart.js';
import { FC, useMemo } from 'react';
import { Scatter } from 'react-chartjs-2';
import { useDatasets } from './hooks/useDatasets';
import { useOptions } from './hooks/useOptions';
import { useStations } from './hooks/useStations';
import { useTrains } from './hooks/useTrains';
import { plugins } from './plugin';

export const Plot: FC = () => {
    const { stations, getYForStation } = useStations();
    const trains = useTrains();
    const datasets = useDatasets(trains, getYForStation);
    const data = useMemo<ChartData>(() => ({ datasets }), [datasets]);
    const options = useOptions(stations);

    return <Scatter data={data} options={options} plugins={plugins} />;
};
