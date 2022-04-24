import { FieldsAreEmpty } from '../firebaseUtility/helpers';
import { backendUrl } from './constants';
import { UserRole, User, UserWithToken } from '../../types';
import { api } from './utility';

type LoginRequestBody = {
  email: string;
  password: string;
};
type LoginResponseBody = UserWithToken;
export const login = ({
  email,
  password,
}: LoginRequestBody): Promise<LoginResponseBody> => {
  if (!email || !password) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<LoginRequestBody, LoginResponseBody>(`${backendUrl}/user/login`, {
    method: 'POST',
    body: {
      password,
      email,
    },
  });
};

type SignupRequestBody = {
  email: string;
  password: string;
  name: string;
  role: UserRole;
};
type SignupResponseBody = UserWithToken;
export const signUp = ({
  email,
  password,
  name,
  role,
}: SignupRequestBody): Promise<SignupResponseBody> => {
  if (!email || !password || !name || !role) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<SignupRequestBody, SignupResponseBody>(
    `${backendUrl}/user/signup`,
    {
      method: 'POST',
      body: {
        password,
        email,
        name,
        role,
      },
    }
  );
};

type DeleteUserQueryParameters = {
  userId: string;
};
type DeleteUserRequestBody = {};
export const deleteUser = ({
  userId,
}: DeleteUserRequestBody & DeleteUserQueryParameters): Promise<unknown> => {
  if (!userId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<DeleteUserRequestBody, unknown>(`${backendUrl}/user/${userId}`, {
    method: 'DELETE',
    body: {},
  });
};

type GetUserQueryParameters = {
  userId: string;
};
type GetUserResponseBody = User;
export const getUser = ({
  userId,
}: GetUserQueryParameters): Promise<GetUserResponseBody> => {
  if (!userId) {
    FieldsAreEmpty();
    return Promise.reject();
  }
  return api<LoginRequestBody, GetUserResponseBody>(
    `${backendUrl}/user/${userId}`,
    { method: 'GET' }
  );
};
