import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { nanoid } from 'nanoid/non-secure';
import { useMemo } from 'react';
import { RootState } from '.';

export type TrainStop = {
    id: string;
    travelDuration: number;
    stopStation: string | null;
    stopDuration: number;
};
export type Train = {
    id: string;
    label: string;

    startTime: number;
    startStation: string | null;

    midStops: TrainStop[];

    endTravelDuration: number;
    endStation: string | null;
};

const trainsEntityAdapter = createEntityAdapter<Train>();
const initialState = {
    count: 1,
    trains: trainsEntityAdapter.getInitialState()
};
type DraftState = WritableDraft<typeof initialState>;

function ifExists(state: DraftState, id: string, update: (state: WritableDraft<Train>) => void) {
    const train = state.trains.entities[id];
    if (train) {
        update(train);
    }
}

function makeReducerCase<Args extends unknown[], P>(
    prepare: (...args: Args) => P,
    reducer: (state: DraftState, action: PayloadAction<P>) => void
) {
    return {
        prepare: (...args: Args) => ({ payload: prepare(...args) }),
        reducer
    };
}

export const { reducer: trains, actions: trainActions } = createSlice({
    name: 'trains',
    initialState,
    reducers: {
        addTrain(state) {
            trainsEntityAdapter.addOne(state.trains, {
                id: nanoid(),
                label: `Pociąg ${state.count}`,

                startTime: 0,
                startStation: null,

                midStops: [],

                endTravelDuration: 0,
                endStation: null
            });
            state.count++;
        },
        editTrain: makeReducerCase(
            (id: string, changes: Partial<Omit<Train, 'id' | 'midStops'>>) => ({ id, changes }),
            (state, { payload: { id, changes } }) => {
                trainsEntityAdapter.updateOne(state.trains, { id, changes });
            }
        ),
        removeTrain: makeReducerCase(
            (id: string) => ({ id }),
            (state, { payload: { id } }) => {
                trainsEntityAdapter.removeOne(state.trains, id);
            }
        ),
        duplicateTrain: makeReducerCase(
            (id: string) => ({ id }),
            (state, { payload: { id } }) => {
                ifExists(state, id, train => {
                    trainsEntityAdapter.addOne(state.trains, {
                        id: nanoid(),
                        label: `${train.label} - Kopia`,

                        startTime: train.startTime,
                        startStation: train.startStation,

                        midStops: train.midStops.map(midStop => ({ ...midStop, id: nanoid() })),

                        endTravelDuration: train.endTravelDuration,
                        endStation: train.endStation
                    });
                    state.count++;
                });
            }
        ),
        addTrainStop: makeReducerCase(
            (trainId: string, index?: number) => ({ trainId, index, stopId: nanoid() }),
            (state, { payload: { trainId, index, stopId } }) => {
                ifExists(state, trainId, train => {
                    const newStop: TrainStop = { id: stopId, travelDuration: 10, stopStation: null, stopDuration: 10 };
                    if (index === undefined || index >= train.midStops.length) {
                        train.midStops.push(newStop);
                    } else if (index >= 0) {
                        train.midStops.splice(index, 0, newStop);
                    }
                });
            }
        ),
        editTrainStop: makeReducerCase(
            (trainId: string, stopId: string, changes: Partial<TrainStop>) => ({ trainId, stopId, changes }),
            (state, { payload: { trainId, stopId, changes } }) => {
                ifExists(state, trainId, train => {
                    const stop = train.midStops.find(midStop => midStop.id === stopId);
                    if (stop) {
                        Object.assign(stop, changes);
                    }
                });
            }
        ),
        removeTrainStop: makeReducerCase(
            (trainId: string, stopId: string) => ({ trainId, stopId }),
            (state, { payload: { trainId, stopId } }) => {
                ifExists(state, trainId, train => {
                    train.midStops = train.midStops.filter(midStop => midStop.id === stopId);
                });
            }
        )
    }
});

export const useTrainSelectors = () =>
    useMemo(() => trainsEntityAdapter.getSelectors((state: RootState) => state.trains.trains), []);
