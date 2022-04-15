type requestMethods = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const logMiddleware = <T>(res: T) => {
  console.log(JSON.stringify(res));
  return res;
};

export const api = <RequestBody, T>(
  url: string,
  options: { body: RequestBody; method: requestMethods }
): Promise<T> => {
  const stringifiedOptions = { ...options, body: JSON.stringify(options.body) };
  return fetch(url, {
    ...stringifiedOptions,
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(logMiddleware)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
};
