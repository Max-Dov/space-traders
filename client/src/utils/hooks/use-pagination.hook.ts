import { useState } from 'react';

interface UsePaginationProps<RecordType> {
  startingPage: number;
  records: Array<RecordType>;
  recordsPerPage: number;
}

export const usePagination = <RecordType = unknown>({
  startingPage,
  records,
  recordsPerPage,
}: UsePaginationProps<RecordType>) => {
  const [page, setPage] = useState(startingPage);
  const totalPages = Math.ceil(records.length / recordsPerPage);
  const paginatedRecords = records.slice(page, recordsPerPage);

  return {
    page,
    setPage,
    totalPages,
    paginatedRecords,
  };
};