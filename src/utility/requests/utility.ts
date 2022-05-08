import { getUser } from '../secureStore';

type requestMethods = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const logMiddleware = <T>(res: T) => {
  console.log(JSON.stringify(res));
  return res;
};

type RequestOptions = {
  body?: string;
  method: requestMethods;
};

export const api = <RequestBody, T>(
  url: string,
  options: { body?: RequestBody; method: requestMethods }
): Promise<T> => {
  const stringifiedOptions: RequestOptions = {
    ...options,
    body: options.body && JSON.stringify(options.body),
  };
  return getUser()
    .then((user) => {
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('authorization', user ? `Bearer ${user.token}` : '');
      return fetch(url, {
        ...stringifiedOptions,
        headers,
      });
    })
    .then(logMiddleware)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (response.status === 204) return response as any;
      return response.json() as Promise<T>;
    });
};
