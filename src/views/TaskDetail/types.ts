import type {EnrichedTask} from '../Marketplace/types';

export type TaskDetailViewProps = {
  task: EnrichedTask;
  formattedPrice: string;
  formattedDistance: string;
  formattedExpiry: string;
  onGoBack: () => void;
};

export type TaskDetailViewModelReturn = {
  task: EnrichedTask;
  onGoBack: () => void;
};
