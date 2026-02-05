import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import type {EnrichedTask} from '../views/Marketplace/types';

export type RootStackParamList = {
  Marketplace: undefined;
  TaskDetail: {task: EnrichedTask};
};

export type RootNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
