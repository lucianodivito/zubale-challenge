import {TaskCategory} from '../../utils/taskHelpers';

export type TaskItem = {
  id: string;
  title: string;
  price: number;
  status: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image_url: string;
  expires_at: string;
};

export type EnrichedTask = TaskItem & {
  category: TaskCategory;
  distance: number;
};

export type PriceRange = {
  min: number;
  max: number;
};

export type FilterState = {
  priceRange: PriceRange | null;
  maxDistance: number | null;
  selectedCategories: TaskCategory[];
};

export type MarketplaceViewModelReturn = {
  allTasks: EnrichedTask[];
  categories: readonly TaskCategory[];
  onTaskPress: (task: EnrichedTask) => void;
};

export type MarketplaceViewProps = {
  tasks: EnrichedTask[];
  totalCount: number;
  filterState: FilterState;
  categories: readonly TaskCategory[];
  isLoadingMore: boolean;
  onEndReached: () => void;
  onCategoryToggle: (category: TaskCategory) => void;
  onPriceRangeChange: (range: PriceRange | null) => void;
  onMaxDistanceChange: (distance: number | null) => void;
  onResetFilters: () => void;
  onTaskPress: (task: EnrichedTask) => void;
};
