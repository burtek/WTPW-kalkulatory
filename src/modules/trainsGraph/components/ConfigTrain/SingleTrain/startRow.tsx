import { ChangeEventHandler, FC, useCallback, useMemo } from 'react';
import AutoWidthInput from 'react-autowidth-input';
import { useAppDispatch } from '../../../state';
import { Train, trainActions } from '../../../state/trains';
import { StationSelect } from '../stationSelect';
import { useStyles } from '../styles';
import { useTrainEdit } from './useTrainEdit';

export const TrainStartRow: FC<Props> = ({ train }) => {
    const { classes } = useStyles();

    const dispatch = useAppDispatch();
    const changeLabel = useTrainEdit(train.id, 'label');
    const changeStartStation = useTrainEdit(train.id, 'startStation');

    const startTime = useMemo(() => {
        const time = train.startTime;

        const hour = `0${Math.floor(time / 60)}`.substr(-2);
        const minutes = `0${Math.floor(time % 60)}`.substr(-2);

        return `${hour}:${minutes}`;
    }, [train.startTime]);
    const changeStartTime = useCallback<ChangeEventHandler<HTMLInputElement | HTMLSelectElement>>(
        event => {
            const clamp = (value: number, max: number) => Math.max(0, Math.min(Math.round(value), max));

            const [hour = 0, minute = 0] = event.target.value.split(':').map(i => +i);
            if (!Number.isInteger(hour) || !Number.isInteger(minute)) {
                return;
            }
            const startTime = 60 * clamp(hour, 23) + clamp(minute, 59);
            dispatch(trainActions.editTrain(train.id, { startTime }));
        },
        [dispatch, train.id]
    );

    return (
        <div>
            Pociąg
            <AutoWidthInput
                className={classes.inlineInput}
                value={train.label ?? ''}
                onChange={changeLabel}
                extraWidth={0}
            />
            rusza ze stacji
            <StationSelect station={train?.startStation} onChange={changeStartStation} />
            o godzinie
            <AutoWidthInput
                className={classes.inlineInput}
                value={startTime}
                onChange={changeStartTime}
                extraWidth={0}
            />
            ,
        </div>
    );
};

interface Props {
    train: Train;
}
