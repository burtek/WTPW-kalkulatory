import type { ChangeEventHandler, FC } from 'react';
import { useAppSelector } from '../../state';
import { useStyles } from './styles';

export const StationSelect: FC<{
    station: string | null | undefined;
    onChange: ChangeEventHandler<HTMLSelectElement>;
}> = ({ station, onChange }) => {
    const { classes, cx } = useStyles();
    const stations = useAppSelector(state => state.railTrack.stations);

    return (
        <select
            className={cx(classes.inlineSelect, !station && classes.inlineSelectEmpty)}
            value={station ?? undefined}
            onChange={onChange}>
            {!station && <option>Wybierz</option>}
            {stations.map(({ id, name }) => (
                <option key={id} value={id}>
                    {name}
                </option>
            ))}
        </select>
    );
};
