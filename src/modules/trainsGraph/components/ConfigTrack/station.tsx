import { ChangeEventHandler, FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../state';
import { railTrackActions, Station } from '../../state/railTrack';
import { AddNewStationCell } from './newStationCell';
import { useStyles } from './styles';

export const StationRow: FC<Props> = ({ index, station: { id, name } }) => {
    const { classes } = useStyles();

    const {
        distances: { [index - 1]: distance }
    } = useAppSelector(state => state.railTrack);
    const dispatch = useAppDispatch();
    const changeStationName = useCallback<ChangeEventHandler<HTMLInputElement>>(
        ({ target }) => dispatch(railTrackActions.renameStation({ id, name: target.value })),
        [dispatch, id]
    );
    const changeLength = useCallback<ChangeEventHandler<HTMLInputElement>>(
        ({ target }) =>
            dispatch(railTrackActions.changeDistanceLength({ index: index - 1, length: target.valueAsNumber })),
        [dispatch, index]
    );
    const removeStation = useCallback(() => dispatch(railTrackActions.removeStation(id)), [dispatch, id]);

    return (
        <>
            <tr>
                <AddNewStationCell index={index} colSpan={index === 0 ? 2 : 1} />
                {index > 0 && (
                    <td className={classes.distance}>
                        <div className="input-group">
                            <input
                                className="form-input"
                                type="number"
                                min={0}
                                value={distance}
                                onChange={changeLength}
                            />
                            <span className="input-group-addon">km</span>
                        </div>
                    </td>
                )}
            </tr>
            <tr>
                <td colSpan={2} className={classes.station}>
                    <div className="input-group">
                        <input className="form-input" value={name} onChange={changeStationName} />
                        <button className="btn btn-primary input-group-btn" onClick={removeStation}>
                            <i className="icon icon-delete" />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};

interface Props {
    index: number;
    station: Station;
}
