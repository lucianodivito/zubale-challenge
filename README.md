# Zubale Challenge — The "Infinite" Marketplace (Performance)

React Native app that renders **10,000 tasks** in a masonry grid with filtering, image caching, and shared element transitions.

**React Native** 0.83.1 (New Architecture) · **TypeScript** · **iOS & Android**

## Running

```bash
yarn install
yarn ios          # or yarn android
yarn start
yarn lint
```

---

## Why React Native CLI instead of Expo

I used the bare React Native CLI because it's the workflow I'm most comfortable with — it's what I've always worked with and where I'm most productive. For this project specifically, having direct access to native configuration was useful for setting up Reanimated 4's shared element transitions and FastImage's native caching, but honestly the main reason is just personal preference and familiarity.

---

## How I solved each requirement

### 1. Virtualization

I used `@shopify/flash-list` with its `masonry` prop for the Pinterest-style layout. FlashList recycles views instead of creating/destroying them like FlatList does, which makes a huge difference with 10,000 items.

Each card shows an image (with variable height for the masonry effect), title, price, and distance. Cards are `React.memo`'d with a custom comparator that checks by `item.id` instead of reference equality, so they don't re-render unnecessarily when the list updates.

On top of that, I added client-side pagination — the list starts with 50 items and loads 50 more as you scroll. This way FlashList doesn't have to compute layout for all 10,000 items at once.

### 2. Heavy Filtering

Filters for Category, Price, and Distance are displayed as inline chips in a sticky header, always visible. Tapping a chip updates the list immediately.

The filtering itself runs in a single `for` loop instead of chaining multiple `.filter()` calls, which avoids creating intermediate arrays. If no filters are active it skips the loop entirely and returns the original array. The result is memoized so it only recalculates when the filter state actually changes.

When you toggle a filter, the pagination resets back to 50 items so the list stays responsive even during rapid filter changes.

### 3. Image Optimization

I used `react-native-fast-image` which provides native-level caching through SDWebImage (iOS) and Glide (Android). Images are cached with `immutable` policy since the URLs are deterministic — same URL always returns the same image, so it skips network revalidation entirely.

To avoid flickering: each card starts with a static gray placeholder, and once the image loads, it fades in with a 250ms animation using Reanimated's `useSharedValue`. The animation runs on the UI thread so it doesn't stutter even when the JS thread is busy.

I chose a static placeholder over a shimmer effect because shimmer keeps animating for every card (even off-screen), which adds unnecessary work during fast scrolling.

### Bonus: Shared Element Transition

When you tap a card, the image animates smoothly to the detail screen as a hero image. This is done with Reanimated 4's `sharedTransitionTag` — the card image and the detail hero image share the same tag, and Reanimated handles the animation automatically.

Navigation uses `@react-navigation/native-stack` which runs transitions on the native thread, needed for shared element animations to work properly. It also gives you native swipe-back on iOS for free.

This feature is still experimental in Reanimated 4. If it causes issues, removing the tags degrades gracefully to a normal stack transition.

### Bonus: Complex Layout (Masonry + Sticky Header)

The masonry layout comes from FlashList's `masonry` + `optimizeItemArrangement` props. Image heights rotate between 3 values (150, 200, 250) based on index to create the Pinterest-style visual variety, and `optimizeItemArrangement` keeps both columns balanced.

The filter bar sits in a sticky header above the list so it's always accessible while scrolling.

---

## Architecture

Every screen follows MVVM with 5 files:

```
Screen.tsx              -> Connects ViewController to View
View.tsx                -> Pure UI, just receives props
useViewController.ts    -> UI logic (formatting, filters, pagination)
useViewModel.ts         -> Business logic (data, navigation)
types.ts                -> TypeScript interfaces
```

## Project Structure

```
src/
├── constants/style/         # Colors, sizes
├── data/tasks.json          # 10,000 task dataset
├── navigation/              # Stack navigator + route types
├── utils/                   # Distance calc, categories, card heights
└── views/
    ├── components/
    │   ├── TaskCard/        # Card with shared transition
    │   └── FilterBar/       # Filter chips
    ├── Marketplace/         # Main list screen
    └── TaskDetail/          # Detail screen with hero image
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `@shopify/flash-list` | High-performance list with masonry |
| `@d11/react-native-fast-image` | Native image caching |
| `react-native-reanimated` 4.x | Animations + shared element transitions |
| `@react-navigation/native-stack` | Native stack navigation |
| `react-native-gesture-handler` | Touch handling |
| `react-native-screens` | Native screen containers |
| `react-native-safe-area-context` | Safe area insets |
