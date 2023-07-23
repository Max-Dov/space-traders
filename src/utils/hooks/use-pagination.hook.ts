import { useEffect, useState } from 'react';

interface UsePaginationProps<RecordType> {
  startingPage: number;
  records: Array<RecordType>;
  recordsPerPage: number;
}

/**
 * Pagination hook for an array. Accepts records and options and returns paginated array.
 * Returns `setPage` to control & update paginated list.
 */
export const usePagination = <RecordType = unknown>({
  startingPage,
  records,
  recordsPerPage,
}: UsePaginationProps<RecordType>) => {
  const [page, setPage] = useState(startingPage);

  /**
   * On records per page change.
   */
  useEffect(() => {
    setPage(0);
  }, [recordsPerPage]);

  const totalPages = Math.ceil(records.length / recordsPerPage);
  const paginatedRecords = records.slice(
    page * recordsPerPage,
    page * recordsPerPage + recordsPerPage
  );

  return {
    page,
    setPage,
    totalPages,
    paginatedRecords,
  };
};