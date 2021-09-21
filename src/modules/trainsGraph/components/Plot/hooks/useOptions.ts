import type { ChartOptions, LinearScaleOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';
import { useMemo } from 'react';
import type { HookStations } from './useStations';

export const useOptions = (stations: HookStations) => {
    const x = useMemo<_DeepPartialObject<LinearScaleOptions>>(
        () => ({
            display: true,
            grid: {
                color: context => (context.tick.value % 60 === 0 ? '#AAA' : '#EEE')
            },
            min: 0,
            max: 24 * 60,
            position: 'bottom',
            ticks: {
                callback: tickValue => ((tickValue as number) % 60 === 0 ? (tickValue as number) / 60 : ''),
                stepSize: 20
            }
        }),
        []
    );
    const y = useMemo<_DeepPartialObject<LinearScaleOptions>>(
        () => ({
            display: true,
            grid: {
                color: context => (stations.find(station => station.distance === context.tick.value) ? '#AAA' : '#EEE')
            },
            min: 0,
            max: stations[stations.length - 1].distance,
            position: 'left',
            reverse: true,
            ticks: {
                callback: tickValue => stations.find(station => station.distance === tickValue)?.name ?? '',
                stepSize: 1
            }
        }),
        [stations]
    );
    const y2 = useMemo<_DeepPartialObject<LinearScaleOptions>>(
        () => ({
            ...y,
            grid: {
                ...y.grid,
                drawOnChartArea: false,
                drawTicks: true
            },
            position: 'right'
        }),
        [y]
    );

    return useMemo<ChartOptions>(() => ({ scales: { x, y, y2 } }), [x, y, y2]);
};
