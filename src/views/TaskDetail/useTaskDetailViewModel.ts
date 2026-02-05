import {useNavigation, useRoute} from '@react-navigation/native';
import type {RootNavigationProp, RootRouteProp} from '../../navigation/types';
import type {TaskDetailViewModelReturn} from './types';

function useTaskDetailViewModel(): TaskDetailViewModelReturn {
  const navigation = useNavigation<RootNavigationProp<'TaskDetail'>>();
  const route = useRoute<RootRouteProp<'TaskDetail'>>();
  const {task} = route.params;

  const onGoBack = () => {
    navigation.goBack();
  };

  return {task, onGoBack};
}

export default useTaskDetailViewModel;
