import * as SecureStore from 'expo-secure-store';
import { User } from '../types';

export const setUser = (user: User) =>
  SecureStore.setItemAsync('user', JSON.stringify(user));

export const getUser = (): Promise<User | null> =>
  SecureStore.getItemAsync('user').then((res) => res && JSON.parse(res));
