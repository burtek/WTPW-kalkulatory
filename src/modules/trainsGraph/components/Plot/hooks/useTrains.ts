import { useAppSelector } from '../../../state';
import { useTrainSelectors } from '../../../state/trains';

export const useTrains = () => {
    const trainSelectors = useTrainSelectors();
    return useAppSelector(trainSelectors.selectAll);
};
