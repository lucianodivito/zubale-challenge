import type {EnrichedTask} from '../../Marketplace/types';

export type TaskCardProps = {
  item: EnrichedTask;
  index: number;
  onPress?: (task: EnrichedTask) => void;
};
