import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Animated from 'react-native-reanimated';
import FastImage from '@d11/react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, sizes} from '../../constants/style/style';
import type {TaskDetailViewProps} from './types';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

function TaskDetailView({
  task,
  formattedPrice,
  formattedDistance,
  formattedExpiry,
  onGoBack,
}: TaskDetailViewProps) {
  const {top} = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <Animated.View sharedTransitionTag={`task-image-${task.id}`}>
          <AnimatedFastImage
            style={styles.heroImage}
            source={{
              uri: task.image_url,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Animated.View>

        <View style={styles.content}>
          <Text style={styles.category}>{task.category}</Text>
          <Text style={styles.title}>{task.title}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Reward</Text>
              <Text style={styles.metaValue}>{formattedPrice}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Distance</Text>
              <Text style={styles.metaValueDistance}>{formattedDistance}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Expires</Text>
              <Text style={styles.metaValueExpiry}>{formattedExpiry}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Text style={styles.address}>{task.location.address}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.statusChip}>
              <Text style={styles.statusText}>{task.status}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable
        style={[styles.backButton, {top: top + 8}]}
        onPress={onGoBack}
        hitSlop={8}>
        <Text style={styles.backText}>{'<'}</Text>
      </Pressable>
    </View>
  );
}

export default TaskDetailView;

const HERO_HEIGHT = 300;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroImage: {
    width: '100%',
    height: HERO_HEIGHT,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    padding: sizes.screenPadding,
  },
  category: {
    fontSize: sizes.fontSizeSmall,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: sizes.cardBorderRadius,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: sizes.fontSizeSmall,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: sizes.fontSizeLarge,
    fontWeight: '700',
    color: colors.priceText,
  },
  metaValueDistance: {
    fontSize: sizes.fontSizeLarge,
    fontWeight: '700',
    color: colors.distanceText,
  },
  metaValueExpiry: {
    fontSize: sizes.fontSizeLarge,
    fontWeight: '700',
    color: colors.text,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: sizes.fontSizeMedium,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  address: {
    fontSize: sizes.fontSizeLarge,
    color: colors.text,
    lineHeight: 22,
  },
  statusChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.chipBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: sizes.fontSizeMedium,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'capitalize',
  },
});
