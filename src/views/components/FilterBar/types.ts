import type {TaskCategory} from '../../../utils/taskHelpers';
import type {PriceRange} from '../../Marketplace/types';

export type FilterBarProps = {
  categories: readonly TaskCategory[];
  selectedCategories: TaskCategory[];
  priceRange: PriceRange | null;
  maxDistance: number | null;
  onCategoryToggle: (category: TaskCategory) => void;
  onPriceRangeChange: (range: PriceRange | null) => void;
  onMaxDistanceChange: (distance: number | null) => void;
  onResetFilters: () => void;
};

export type ChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};
