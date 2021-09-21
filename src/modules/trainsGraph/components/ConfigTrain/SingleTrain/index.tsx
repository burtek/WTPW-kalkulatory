import type { FC } from 'react';
import { useAppSelector } from '../../../state';
import { useTrainSelectors } from '../../../state/trains';
import { TrainEndRow } from './endRow';
import { TrainStartRow } from './startRow';
import { TrainStopsRow } from './stopsRow';

export const SingleTrain: FC<{ trainId: string }> = ({ trainId }) => {
    const trainSelectors = useTrainSelectors();
    const train = useAppSelector(state => trainSelectors.selectById(state, trainId));

    return train ? (
        <div>
            <TrainStartRow train={train} />
            <TrainStopsRow train={train} />
            <TrainEndRow train={train} />
            <hr />
        </div>
    ) : null;
};
