import { useCallback, useMemo } from 'react';
import { useAppSelector } from '../../../state';

export const useStations = () => {
    const { stations, distances } = useAppSelector(state => state.railTrack);

    const stationValues = useMemo(
        () =>
            stations.map((station, index) => ({
                id: station.id,
                name: station.name,
                distance: index === 0 ? 0 : distances.slice(0, index).reduce((a, b) => a + b, 0)
            })),
        [distances, stations]
    );

    const getYForStation = useCallback(
        (stationId: string | null) =>
            (stationId && stationValues.find(station => station.id === stationId)?.distance) || 0,
        [stationValues]
    );

    return {
        stations: stationValues,
        getYForStation
    };
};

export type HookStations = ReturnType<typeof useStations>['stations'];
