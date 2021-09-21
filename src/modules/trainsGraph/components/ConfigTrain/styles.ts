import { makeStyles } from '../../styles/makeStyles';

export const useStyles = makeStyles()(theme => ({
    inlineInput: {
        marginLeft: theme.inlineInputMarginVertical,
        marginRight: theme.inlineInputMarginVertical,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottomWidth: 1
    },
    inlineSelect: {
        marginLeft: theme.inlineInputMarginVertical,
        marginRight: theme.inlineInputMarginVertical,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomWidth: 1,
        'option:not([value])': {
            fontStyle: 'italic'
        }
    },
    inlineSelectEmpty: {
        fontStyle: 'italic',
        option: {
            fontStyle: 'normal'
        }
    }
}));
