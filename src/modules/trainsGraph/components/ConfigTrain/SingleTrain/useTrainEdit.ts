import type { ChangeEventHandler } from 'react';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../state';
import { trainActions } from '../../../state/trains';

export const useTrainEdit = (
    trainId: string,
    key: 'label' | 'startStation' | 'endStation' | 'endTravelDuration',
    isNumeric = false
) => {
    const dispatch = useAppDispatch();
    return useCallback<ChangeEventHandler<HTMLInputElement | HTMLSelectElement>>(
        event =>
            dispatch(trainActions.editTrain(trainId, { [key]: isNumeric ? +event.target.value : event.target.value })),
        [dispatch, trainId, key, isNumeric]
    );
};
