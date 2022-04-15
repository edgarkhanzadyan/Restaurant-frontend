import { FieldsAreEmpty } from '../firebaseUtility/helpers';
import { backendUrl } from './constants';
import { UserRole } from '../../types';

type LoginRequestBody = {
  email: string;
  password: string;
};

export const login = ({ email, password }: LoginRequestBody) => {
  if (!email || !password) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/user/login`, {
    method: 'POST',
    body: JSON.stringify({
      password,
      email,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};

type SignupRequestBody = {
  email: string;
  password: string;
  name: string;
  userRole: UserRole;
};

export const signup = ({
  email,
  password,
  name,
  userRole,
}: SignupRequestBody) => {
  if (!email || !password || !name || !userRole) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/user/signup`, {
    method: 'POST',
    body: JSON.stringify({
      password,
      email,
      name,
      role: userRole,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
};

type DeleteUserRequestBody = {
  userId: string;
};

export const deleteUser = ({ userId }: DeleteUserRequestBody) => {
  if (!userId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return fetch(`${backendUrl}/user/${userId}`, {
    method: 'DELETE',
  }).then((res) => res.json());
};

// export const signup = ({ email, password, role }) =>
