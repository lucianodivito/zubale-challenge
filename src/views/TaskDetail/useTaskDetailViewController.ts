import useTaskDetailViewModel from './useTaskDetailViewModel';
import type {TaskDetailViewProps} from './types';

function useTaskDetailViewController(): TaskDetailViewProps {
  const {task, onGoBack} = useTaskDetailViewModel();

  const formattedPrice = `$${task.price.toFixed(2)}`;
  const formattedDistance = `${task.distance.toFixed(1)} km`;

  const expiryDate = new Date(task.expires_at);
  const formattedExpiry = expiryDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    task,
    formattedPrice,
    formattedDistance,
    formattedExpiry,
    onGoBack,
  };
}

export default useTaskDetailViewController;
