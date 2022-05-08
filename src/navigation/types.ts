import { User, UserRole } from '../types';

export type RootStackParamList = {
  LoginScreen: undefined;
  AdminScreen: undefined;
  RestaurantOwnerScreen: undefined;
  SignUpScreen: { isCreatorAdmin: boolean };
  RestaurantFeed: undefined;
  UserScreen: { userId: string };
  AddRestaurantScreen: { role: UserRole };
  ReplyScreen: undefined;
  RestaurantScreen: { userData: User; restaurantId: string };
  UserFeed: undefined;
};

export type AdminTabScreenParamList = {
  RestaurantFeed: undefined;
  UserFeed: undefined;
};

export type OwnerTabScreenParamList = {
  RestaurantFeed: undefined;
  ResponsesFeed: undefined;
};
