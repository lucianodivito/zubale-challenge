import React, {useCallback} from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import {colors, sizes} from '../../../constants/style/style';
import type {FilterBarProps, ChipProps} from './types';
import type {TaskCategory} from '../../../utils/taskHelpers';
import type {PriceRange} from '../../Marketplace/types';

const PRICE_OPTIONS: {label: string; value: PriceRange | null}[] = [
  {label: 'All', value: null},
  {label: '$0-25', value: {min: 0, max: 25}},
  {label: '$25-50', value: {min: 25, max: 50}},
  {label: '$50-100', value: {min: 50, max: 100}},
  {label: '$100+', value: {min: 100, max: Infinity}},
];

const DISTANCE_OPTIONS: {label: string; value: number | null}[] = [
  {label: 'All', value: null},
  {label: '<1 km', value: 1},
  {label: '<2 km', value: 2},
  {label: '<5 km', value: 5},
];

function Chip({label, active, onPress}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const MemoizedChip = React.memo(Chip);

function isPriceRangeEqual(
  a: PriceRange | null,
  b: PriceRange | null,
): boolean {
  if (a === null && b === null) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  return a.min === b.min && a.max === b.max;
}

function FilterBarComponent({
  categories,
  selectedCategories,
  priceRange,
  maxDistance,
  onCategoryToggle,
  onPriceRangeChange,
  onMaxDistanceChange,
  onResetFilters,
}: FilterBarProps) {
  const hasActiveFilters =
    priceRange !== null ||
    maxDistance !== null ||
    selectedCategories.length > 0;

  const handleCategoryPress = useCallback(
    (cat: TaskCategory) => () => onCategoryToggle(cat),
    [onCategoryToggle],
  );

  const handlePricePress = useCallback(
    (value: PriceRange | null) => () => onPriceRangeChange(value),
    [onPriceRangeChange],
  );

  const handleDistancePress = useCallback(
    (value: number | null) => () => onMaxDistanceChange(value),
    [onMaxDistanceChange],
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}>
          {categories.map(cat => (
            <MemoizedChip
              key={cat}
              label={cat}
              active={selectedCategories.includes(cat)}
              onPress={handleCategoryPress(cat)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>Price</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}>
          {PRICE_OPTIONS.map(opt => (
            <MemoizedChip
              key={opt.label}
              label={opt.label}
              active={isPriceRangeEqual(priceRange, opt.value)}
              onPress={handlePricePress(opt.value)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>Distance</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}>
          {DISTANCE_OPTIONS.map(opt => (
            <MemoizedChip
              key={opt.label}
              label={opt.label}
              active={maxDistance === opt.value}
              onPress={handleDistancePress(opt.value)}
            />
          ))}
        </ScrollView>
      </View>

      {hasActiveFilters && (
        <Pressable onPress={onResetFilters} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset Filters</Text>
        </Pressable>
      )}
    </View>
  );
}

const FilterBar = React.memo(FilterBarComponent);

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingVertical: 8,
    paddingHorizontal: sizes.screenPadding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: sizes.fontSizeSmall,
    fontWeight: '700',
    color: colors.textSecondary,
    width: 60,
    textTransform: 'uppercase',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 6,
  },
  chip: {
    height: sizes.chipHeight,
    paddingHorizontal: sizes.chipPaddingHorizontal,
    borderRadius: sizes.chipBorderRadius,
    backgroundColor: colors.chipBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: colors.chipActiveBackground,
  },
  chipText: {
    fontSize: sizes.fontSizeSmall,
    fontWeight: '600',
    color: colors.chipText,
  },
  chipTextActive: {
    color: colors.chipActiveText,
  },
  resetButton: {
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 2,
  },
  resetText: {
    fontSize: sizes.fontSizeSmall,
    color: colors.primary,
    fontWeight: '600',
  },
});
