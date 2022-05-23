import { User, UserRole } from '../types';

export type RootStackParamList = {
  LoginScreen: undefined;
  AdminScreen: undefined;
  RestaurantOwnerScreen: undefined;
  SignUpScreen: { isCreatorAdmin: boolean; onBack?: () => unknown };
  RestaurantFeed: undefined;
  UserScreen: { userId: string };
  AddRestaurantScreen: { role: UserRole };
  ReplyScreen: {
    score: number;
    comment: string;
    reviewId: string;
    userName: string;
    restaurantName: string;
    onBack: () => unknown;
  };
  RestaurantScreen: { userData: User; restaurantId: string };
  UserFeed: undefined;
  ResponsesFeed: undefined;
};

export type AdminTabScreenParamList = {
  RestaurantFeed: undefined;
  UserFeed: undefined;
};

export type OwnerTabScreenParamList = {
  RestaurantFeed: undefined;
  ResponsesFeed: undefined;
};
