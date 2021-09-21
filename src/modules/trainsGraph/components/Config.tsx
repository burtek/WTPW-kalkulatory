import type { FC } from 'react';
import { ConfigTrack } from './ConfigTrack';
import { ConfigTrain } from './ConfigTrain';
import { makeStyles } from '../styles/makeStyles';

const useStyles = makeStyles()(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    trackConfig: {
        flex: 0,
        flexBasis: 250
    },
    trainsConfig: {
        marginLeft: 50,
        flex: 1
    }
}));

export const Config: FC = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <ConfigTrack className={classes.trackConfig} />
            <ConfigTrain className={classes.trainsConfig} />
        </div>
    );
};
