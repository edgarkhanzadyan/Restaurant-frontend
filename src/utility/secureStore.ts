import * as SecureStore from 'expo-secure-store';
import { UserWithToken } from '../types';

export const setUser = (user: UserWithToken) =>
  SecureStore.setItemAsync('user', JSON.stringify(user));

export const getUser = (): Promise<UserWithToken | null> =>
  SecureStore.getItemAsync('user').then((res) => res && JSON.parse(res));

export const signOut = () => SecureStore.deleteItemAsync('user');
