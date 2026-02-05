import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import FastImage from '@d11/react-native-fast-image';
import {colors, sizes} from '../../../constants/style/style';
import {getCardImageHeight} from '../../../utils/taskHelpers';
import type {TaskCardProps} from './types';

const CATEGORY_COLORS: Record<string, string> = {
  Audit: colors.categoryAudit,
  Inventory: colors.categoryInventory,
  Cleaning: colors.categoryCleaning,
  Delivery: colors.categoryDelivery,
  Restock: colors.categoryRestock,
};

function TaskCardComponent({item, index, onPress}: TaskCardProps) {
  const imageHeight = getCardImageHeight(index);
  const categoryColor = CATEGORY_COLORS[item.category] ?? colors.primary;
  const [imageLoaded, setImageLoaded] = useState(false);
  const opacity = useSharedValue(0);

  const onImageLoad = useCallback(() => {
    setImageLoaded(true);
    opacity.value = withTiming(1, {duration: 250});
  }, [opacity]);

  const handlePress = useCallback(() => {
    onPress?.(item);
  }, [onPress, item]);

  const cardContent = (
    <View style={styles.card}>
      <View style={[styles.imageContainer, {height: imageHeight}]}>
        {!imageLoaded && (
          <View style={[styles.placeholder, {height: imageHeight}]}>
            <View style={styles.placeholderIcon} />
          </View>
        )}
        <Animated.View
          style={[StyleSheet.absoluteFill, {opacity}]}
          sharedTransitionTag={`task-image-${item.id}`}>
          <FastImage
            style={[styles.image, {height: imageHeight}]}
            source={{
              uri: item.image_url,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoad={onImageLoad}
          />
        </Animated.View>
      </View>
      <View style={styles.content}>
        <View style={[styles.categoryChip, {backgroundColor: categoryColor}]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.distance}>{item.distance} km</Text>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={handlePress}>{cardContent}</Pressable>;
  }

  return cardContent;
}

const TaskCard = React.memo(TaskCardComponent, (prev, next) => {
  return (
    prev.item.id === next.item.id &&
    prev.index === next.index &&
    prev.onPress === next.onPress
  );
});

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: sizes.cardBorderRadius,
    overflow: 'hidden',
    margin: sizes.cardGap / 2,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
  placeholder: {
    width: '100%',
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.textTertiary,
    opacity: 0.4,
  },
  content: {
    padding: 10,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  categoryText: {
    color: colors.surface,
    fontSize: sizes.fontSizeSmall,
    fontWeight: '600',
  },
  title: {
    fontSize: sizes.fontSizeMedium,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: sizes.fontSizeLarge,
    fontWeight: '700',
    color: colors.priceText,
  },
  distance: {
    fontSize: sizes.fontSizeSmall,
    color: colors.distanceText,
    fontWeight: '500',
  },
});
