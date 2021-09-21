import { makeStyles } from '../../styles/makeStyles';

export const useStyles = makeStyles()((_theme, _params, createRef) => {
    const distance = {
        ref: createRef()
    };
    const station = {
        ref: createRef()
    };

    return {
        trainTrack: {
            tr: {
                height: 18
            },
            td: {
                verticalAlign: 'middle',
                [`&.${station.ref}`]: {
                    input: {
                        width: '100%'
                    }
                },
                [`&.${distance.ref}`]: {
                    input: {
                        width: 90
                    }
                }
            }
        },
        station,
        distance,
        addStationCol: {
            minWidth: 120
        }
    };
});
