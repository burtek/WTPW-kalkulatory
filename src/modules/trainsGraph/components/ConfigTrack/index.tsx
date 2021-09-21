import type { FC } from 'react';
import { useAppSelector } from '../../state';
import { AddNewStationCell } from './newStationCell';
import { StationRow } from './station';
import { useStyles } from './styles';

export const ConfigTrack: FC<Props> = ({ className }) => {
    const { classes, cx } = useStyles();
    const { stations } = useAppSelector(state => state.railTrack);

    return (
        <table className={cx(className, classes.trainTrack)}>
            <thead>
                <tr>
                    <th scope="col" className={classes.addStationCol}>
                        Stacja
                    </th>
                    <th scope="col">Odległość</th>
                </tr>
            </thead>
            <tbody>
                {stations.map((station, index) => (
                    <StationRow key={station.id} station={station} index={index} />
                ))}
                <tr>
                    <AddNewStationCell index={stations.length} colSpan={2} />
                </tr>
            </tbody>
        </table>
    );
};

interface Props {
    className?: string;
}
