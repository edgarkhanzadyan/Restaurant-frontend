import { UserRole } from '../types';

export type RootStackParamList = {
  LoginScreen: undefined;
  AdminScreen: undefined;
  RestaurantOwnerScreen: undefined;
  SignUpScreen: { isCreatorAdmin: boolean };
  RestaurantFeed: undefined;
  UserScreen: undefined;
  AddRestaurantScreen: { role: UserRole };
  ReplyScreen: undefined;
  RestaurantScreen: undefined;
};
