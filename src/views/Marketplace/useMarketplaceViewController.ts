import {useState, useMemo, useCallback, useRef} from 'react';
import useMarketplaceViewModel from './useMarketplaceViewModel';
import type {
  FilterState,
  MarketplaceViewProps,
  PriceRange,
  EnrichedTask,
} from './types';
import type {TaskCategory} from '../../utils/taskHelpers';

const INITIAL_FILTER_STATE: FilterState = {
  priceRange: null,
  maxDistance: null,
  selectedCategories: [],
};

const PAGE_SIZE = 50;

function applyFilters(
  tasks: EnrichedTask[],
  filters: FilterState,
): EnrichedTask[] {
  const {priceRange, maxDistance, selectedCategories} = filters;
  const hasPrice = priceRange !== null;
  const hasDistance = maxDistance !== null;
  const hasCategories = selectedCategories.length > 0;

  if (!hasPrice && !hasDistance && !hasCategories) {
    return tasks;
  }

  const result: EnrichedTask[] = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (hasPrice && (task.price < priceRange.min || task.price > priceRange.max)) {
      continue;
    }
    if (hasDistance && task.distance > maxDistance) {
      continue;
    }
    if (hasCategories && !selectedCategories.includes(task.category)) {
      continue;
    }
    result.push(task);
  }
  return result;
}

function useMarketplaceViewController(): MarketplaceViewProps {
  const {allTasks, categories, onTaskPress} = useMarketplaceViewModel();
  const [filterState, setFilterState] =
    useState<FilterState>(INITIAL_FILTER_STATE);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const isLoadingMoreRef = useRef(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredTasks = useMemo(
    () => applyFilters(allTasks, filterState),
    [allTasks, filterState],
  );

  const paginatedTasks = useMemo(
    () => filteredTasks.slice(0, visibleCount),
    [filteredTasks, visibleCount],
  );

  const onCategoryToggle = useCallback((category: TaskCategory) => {
    setFilterState(prev => {
      const exists = prev.selectedCategories.includes(category);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter(c => c !== category)
          : [...prev.selectedCategories, category],
      };
    });
    setVisibleCount(PAGE_SIZE);
  }, []);

  const onPriceRangeChange = useCallback((range: PriceRange | null) => {
    setFilterState(prev => ({...prev, priceRange: range}));
    setVisibleCount(PAGE_SIZE);
  }, []);

  const onMaxDistanceChange = useCallback((distance: number | null) => {
    setFilterState(prev => ({...prev, maxDistance: distance}));
    setVisibleCount(PAGE_SIZE);
  }, []);

  const onResetFilters = useCallback(() => {
    setFilterState(INITIAL_FILTER_STATE);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const onEndReached = useCallback(() => {
    if (isLoadingMoreRef.current || visibleCount >= filteredTasks.length) {
      return;
    }
    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredTasks.length));
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }, 300);
  }, [visibleCount, filteredTasks.length]);

  return {
    tasks: paginatedTasks,
    totalCount: allTasks.length,
    filterState,
    categories,
    isLoadingMore,
    onEndReached,
    onCategoryToggle,
    onPriceRangeChange,
    onMaxDistanceChange,
    onResetFilters,
    onTaskPress,
  };
}

export default useMarketplaceViewController;
