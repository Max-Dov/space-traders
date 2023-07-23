import { makeApiRequest } from '@utils';
import { ApiListResponse } from '@types';

/**
 * Fetches total amount records from given list endpoint.
 */
export const fetchFullList = async <RecordType = unknown>(url: string): Promise<Array<RecordType> | null> => {
  const limit = 20; // api defined value, max limit on endpoints is that
  const response = await makeApiRequest<ApiListResponse<RecordType>>({
    url,
    method: 'GET',
    listParams: {
      page: 1,
      limit,
    },
  });
  if (response === null) {
    return null;
  }
  const total = response.meta.total;
  const records = response.data;
  if (total > limit) { // then need to fetch remaining records
    const requestsAmount = Math.trunc((total - limit /* == records left */) / limit)
    const responses = await Promise.all(new Array(requestsAmount).fill('temp').map((_, index) => {
      return makeApiRequest<ApiListResponse<RecordType>>({
        url,
        method: 'GET',
        listParams: {
          page: 2 + index,
          limit,
        }
      })
    }))
    responses.forEach(response => {
      if (response !== null) {
        records.concat(response.data);
      }
    })
  }
  return records;
};