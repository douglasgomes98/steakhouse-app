import queryString from 'query-string';

export function parseQueryParams(query: string) {
  return queryString.parse(query, {
    parseBooleans: true,
    parseNumbers: true,
    arrayFormat: 'comma',
  });
}
