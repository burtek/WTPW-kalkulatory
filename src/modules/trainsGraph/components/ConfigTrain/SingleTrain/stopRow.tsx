import type { ChangeEventHandler, FC } from 'react';
import { useCallback } from 'react';
import AutoWidthInput from 'react-autowidth-input';
import { useAppDispatch } from '../../../state';
import { trainActions, TrainStop } from '../../../state/trains';
import { StationSelect } from '../stationSelect';
import { useStyles } from '../styles';

export const TrainStopRow: FC<Props> = ({ trainId, midStop }) => {
    const { classes } = useStyles();

    const dispatch = useAppDispatch();
    const changeTravelDuration = useCallback<ChangeEventHandler<HTMLInputElement>>(
        ({ target }) => dispatch(trainActions.editTrainStop(trainId, midStop.id, { travelDuration: +target.value })),
        [dispatch, midStop.id, trainId]
    );
    const changeStopStation = useCallback<ChangeEventHandler<HTMLSelectElement>>(
        ({ target }) => dispatch(trainActions.editTrainStop(trainId, midStop.id, { stopStation: target.value })),
        [dispatch, midStop.id, trainId]
    );
    const changeStopDuration = useCallback<ChangeEventHandler<HTMLInputElement>>(
        ({ target }) => dispatch(trainActions.editTrainStop(trainId, midStop.id, { stopDuration: +target.value })),
        [dispatch, midStop.id, trainId]
    );
    const removeStop = useCallback(
        () => dispatch(trainActions.removeTrainStop(trainId, midStop.id)),
        [dispatch, midStop.id, trainId]
    );

    return (
        <div>
            Po
            <AutoWidthInput
                className={classes.inlineInput}
                value={`${midStop.travelDuration}`}
                onChange={changeTravelDuration}
                extraWidth={0}
            />
            minutach podróży zatrzymuje się na stacji
            <StationSelect station={midStop.stopStation} onChange={changeStopStation} />, z której rusza dalej po
            <AutoWidthInput
                className={classes.inlineInput}
                value={`${midStop.stopDuration}`}
                onChange={changeStopDuration}
                extraWidth={0}
            />
            minutach,{' '}
            <a href="#" onClick={removeStop}>
                (<i className="icon icon-delete" />)
            </a>
        </div>
    );
};

interface Props {
    trainId: string;
    midStop: TrainStop;
}
