import type { FC } from 'react';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../state';
import { Train, trainActions } from '../../../state/trains';
import { TrainStopRow } from './stopRow';

export const TrainStopsRow: FC<Props> = ({ train }) => {
    const dispatch = useAppDispatch();
    const addStop = useCallback(() => dispatch(trainActions.addTrainStop(train.id)), [dispatch, train.id]);

    return (
        <div>
            {train?.midStops.map(midStop => (
                <TrainStopRow key={midStop.id} trainId={train.id} midStop={midStop} />
            ))}
            <a href="#" onClick={addStop}>
                <i className="icon icon-plus" />
                <span className="pl-1">Dodaj postój</span>
            </a>
        </div>
    );
};

interface Props {
    train: Train;
}
