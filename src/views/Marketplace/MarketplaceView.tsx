import React, {useCallback} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {FlashList, type ListRenderItemInfo} from '@shopify/flash-list';
import {colors, sizes} from '../../constants/style/style';
import TaskCard from '../components/TaskCard/TaskCard';
import FilterBar from '../components/FilterBar/FilterBar';
import type {MarketplaceViewProps, EnrichedTask} from './types';

const NUM_COLUMNS = 2;
const DRAW_DISTANCE = 300;

function MarketplaceView({
  tasks,
  totalCount,
  filterState,
  categories,
  isLoadingMore,
  onEndReached,
  onCategoryToggle,
  onPriceRangeChange,
  onMaxDistanceChange,
  onResetFilters,
  onTaskPress,
}: MarketplaceViewProps) {
  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<EnrichedTask>) => (
      <TaskCard item={item} index={index} onPress={onTaskPress} />
    ),
    [onTaskPress],
  );

  const keyExtractor = useCallback((item: EnrichedTask) => item.id, []);

  const getItemType = useCallback(
    (item: EnrichedTask) => item.category,
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <FilterBar
          categories={categories}
          selectedCategories={filterState.selectedCategories}
          priceRange={filterState.priceRange}
          maxDistance={filterState.maxDistance}
          onCategoryToggle={onCategoryToggle}
          onPriceRangeChange={onPriceRangeChange}
          onMaxDistanceChange={onMaxDistanceChange}
          onResetFilters={onResetFilters}
        />
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            {tasks.length.toLocaleString()} of {totalCount.toLocaleString()} tasks
          </Text>
        </View>
      </View>
      <FlashList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        numColumns={NUM_COLUMNS}
        masonry
        optimizeItemArrangement
        drawDistance={DRAW_DISTANCE}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color={colors.primary}
            />
          ) : null
        }
        contentContainerStyle={styles.listContent}
        extraData={filterState}
      />
    </View>
  );
}

export default MarketplaceView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: sizes.cardGap / 2,
    paddingBottom: sizes.screenPadding,
  },
  stickyHeader: {
    backgroundColor: colors.background,
    paddingBottom: 4,
  },
  resultsRow: {
    paddingHorizontal: sizes.screenPadding,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: sizes.fontSizeSmall,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  loader: {
    paddingVertical: 20,
  },
});
