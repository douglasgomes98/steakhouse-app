import queryString from 'query-string';

export function mountQueryParams(params: Record<string, unknown>) {
  const stringifyParams = queryString.stringify(
    { ...params },
    {
      arrayFormat: 'comma',
    },
  );

  return stringifyParams;
}
