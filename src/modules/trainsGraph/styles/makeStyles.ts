import { createMakeStyles } from 'tss-react';

function useTheme() {
    return {
        inlineInputMarginVertical: `0.3em`
    };
}

export const { makeStyles } = createMakeStyles({ useTheme });
