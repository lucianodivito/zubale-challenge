import {useMemo, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import tasksData from '../../data/tasks.json';
import {
  assignCategory,
  getDistanceFromReference,
  ALL_CATEGORIES,
} from '../../utils/taskHelpers';
import type {RootNavigationProp} from '../../navigation/types';
import type {TaskItem, EnrichedTask, MarketplaceViewModelReturn} from './types';

function useMarketplaceViewModel(): MarketplaceViewModelReturn {
  const navigation = useNavigation<RootNavigationProp<'Marketplace'>>();

  const allTasks = useMemo<EnrichedTask[]>(() => {
    const raw = tasksData as TaskItem[];
    const enriched = new Array<EnrichedTask>(raw.length);
    for (let i = 0; i < raw.length; i++) {
      const task = raw[i];
      enriched[i] = {
        ...task,
        category: assignCategory(i),
        distance: getDistanceFromReference(
          task.location.lat,
          task.location.lng,
        ),
      };
    }
    return enriched;
  }, []);

  const onTaskPress = useCallback(
    (task: EnrichedTask) => {
      navigation.navigate('TaskDetail', {task});
    },
    [navigation],
  );

  return {
    allTasks,
    categories: ALL_CATEGORIES,
    onTaskPress,
  };
}

export default useMarketplaceViewModel;
