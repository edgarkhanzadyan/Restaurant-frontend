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
  console.log(stringifiedOptions);
  return getUser()
    .then((user) =>
      fetch(url, {
        ...stringifiedOptions,
        headers: {
          'Content-type': 'application/json',
          authorization: user ? `Bearer ${user.token}` : undefined,
        },
      })
    )
    .then(logMiddleware)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
};
