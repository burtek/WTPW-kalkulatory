import type { ChartData } from 'chart.js';
import { useMemo } from 'react';
import type { Train } from '../../../state/trains';
import { colors } from '../colors';

export const useDatasets = (trains: Train[], getYForStation: (stationId: string | null) => number) =>
    useMemo<ChartData['datasets']>(
        () =>
            trains.map((train, index) => {
                const start = { x: train.startTime, y: getYForStation(train.startStation) };
                const midStops = train.midStops.reduce(
                    ({ currentTime, acc }, midStop) => {
                        const arrival = {
                            x: currentTime + midStop.travelDuration,
                            y: getYForStation(midStop.stopStation)
                        };
                        const departure = { x: arrival.x + midStop.stopDuration, y: arrival.y };

                        return {
                            currentTime: departure.x,
                            acc: [...acc, arrival, departure]
                        };
                    },
                    { currentTime: start.x, acc: [] as Array<{ x: number; y: number }> }
                );
                const end = {
                    x: midStops.currentTime + train.endTravelDuration,
                    y: getYForStation(train.endStation)
                };

                const color = colors[index % colors.length];

                return {
                    label: train.label,
                    data: [start, ...midStops.acc, end],
                    backgroundColor: color,
                    borderColor: color,
                    showLine: true
                };
            }),
        [getYForStation, trains]
    );
