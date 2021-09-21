import { FC, useCallback } from 'react';
import AutoWidthInput from 'react-autowidth-input';
import { useAppDispatch } from '../../../state';
import { Train, trainActions } from '../../../state/trains';
import { StationSelect } from '../stationSelect';
import { useStyles } from '../styles';
import { useTrainEdit } from './useTrainEdit';

export const TrainEndRow: FC<Props> = ({ train }) => {
    const { classes } = useStyles();

    const changeEndStation = useTrainEdit(train.id, 'endStation');
    const changeEndTime = useTrainEdit(train.id, 'endTravelDuration', true);

    const dispatch = useAppDispatch();
    const removeTrain = useCallback(() => dispatch(trainActions.removeTrain(train.id)), [dispatch, train.id]);
    const dupeTrain = useCallback(() => dispatch(trainActions.duplicateTrain(train.id)), [dispatch, train.id]);

    return (
        <div>
            I po
            <AutoWidthInput
                className={classes.inlineInput}
                value={`${train.endTravelDuration}`}
                onChange={changeEndTime}
                extraWidth={0}
            />
            minutach kończy bieg na stacji
            <StationSelect station={train.endStation} onChange={changeEndStation} />{' '}
            <a href="#" onClick={removeTrain}>
                (<i className="icon icon-delete" /> usuń pociąg)
            </a>{' '}
            <a href="#" onClick={dupeTrain}>
                (<i className="icon icon-copy" /> duplikuj pociąg)
            </a>
        </div>
    );
};

interface Props {
    train: Train;
}
