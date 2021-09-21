import type { FC } from 'react';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../state';
import { trainActions, useTrainSelectors } from '../../state/trains';
import { SingleTrain } from './SingleTrain';

export const ConfigTrain: FC<{ className?: string }> = ({ className }) => {
    const trainSelectors = useTrainSelectors();
    const trains = useAppSelector(trainSelectors.selectIds) as string[];

    const dispatch = useAppDispatch();
    const addTrain = useCallback(() => dispatch(trainActions.addTrain()), [dispatch]);

    return (
        <div className={className}>
            {trains.map(id => (
                <SingleTrain key={id} trainId={id} />
            ))}
            <a href="#" onClick={addTrain}>
                <i className="icon icon-plus" />
                <span className="pl-1">Dodaj pociąg</span>
            </a>
        </div>
    );
};
