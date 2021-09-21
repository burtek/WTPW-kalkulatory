import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid/non-secure';

export type Station = { id: string; name: string };

export const { reducer: railTrack, actions: railTrackActions } = createSlice({
    name: 'railTrack',
    initialState: {
        stations: ['A', 'B', 'C', 'D', 'E'].map<Station>(name => ({ id: nanoid(), name })),
        distances: [5, 10, 8, 12]
    },
    reducers: {
        addStation(state, { payload: index }: PayloadAction<number>) {
            if (index === 0) {
                state.distances.unshift(10);
            } else if (index === state.stations.length) {
                state.distances.push(10);
            } else {
                const length = state.distances[index - 1] / 2;
                state.distances.splice(index - 1, 1, length, length);
            }
            state.stations.splice(index, 0, { id: nanoid(), name: 'New Station' });
        },
        removeStation(state, { payload: idToRemove }: PayloadAction<string>) {
            const index = state.stations.findIndex(({ id }) => id === idToRemove);

            if (index === 0) {
                state.distances.shift();
                state.stations.shift();
            } else if (index === state.stations.length - 1) {
                state.distances.pop();
                state.stations.pop();
            } else if (index > 0) {
                state.stations.splice(index, 1);
                state.distances.splice(index - 1, 2, state.distances[index - 1] + state.distances[index]);
            }
        },
        renameStation(state, { payload: { id: idToRename, name } }: PayloadAction<Station>) {
            const station = state.stations.find(({ id }) => id === idToRename);
            if (station) {
                station.name = name;
            }
        },
        changeDistanceLength(state, { payload: { index, length } }: PayloadAction<{ index: number; length: number }>) {
            state.distances[index] = length;
        }
    }
});
