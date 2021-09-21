import type { FC, MouseEventHandler } from 'react';
import { useCallback } from 'react';
import { useAppDispatch } from '../../state';
import { railTrackActions } from '../../state/railTrack';

export const AddNewStationCell: FC<Props> = ({ colSpan, index }) => {
    const dispatch = useAppDispatch();
    const addStation = useCallback<MouseEventHandler>(
        event => {
            event.preventDefault();
            return dispatch(railTrackActions.addStation(index));
        },
        [dispatch, index]
    );

    return (
        <td className="text-tiny p-1 pr-2" colSpan={colSpan}>
            <a href="#" onClick={addStation}>
                <i className="icon icon-plus" />
                <span className="pl-1">Dodaj stację</span>
            </a>
        </td>
    );
};

interface Props {
    colSpan?: number;
    index: number;
}
