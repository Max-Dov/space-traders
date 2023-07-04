import { ReactNode } from 'react';
import { usePagination } from '@utils';
import React from 'react';
import { useTableFiltering } from '@utils/hooks/use-table-filtering.hook';

export interface TableColumn<RecordType> {
  /**
   * Column ID, e.g. "buy-or-sell".
   */
  id: string;
  /**
   * Whatever goes into <th>.
   */
  getHeader: (records: Array<RecordType>) => ReactNode;
  /**
   * Whatever goes into <td>.
   */
  getCell: (record: RecordType) => ReactNode;
  /**
   * Should return value that can be used to filter/sort by.
   * Returned value would be filtered against another string via `String.includes` method.
   */
  getFilterValue?: (record: RecordType) => string;
  isSortable?: boolean;
}

interface TableProps<RecordType> {
  /**
   * Config for table would be accessed via zustand by that ID.
   * Also can be used as CSS selector.
   */
  id: string;
  records: Array<RecordType>;
  recordsPerPage: number;
  columns: Array<TableColumn<RecordType>>;
  enableFiltering?: boolean;
  enableSorting?: boolean;
}

/**
 * Logic wrapper for tables with minimal styling.
 * Style overrides should be done via `#table-id` selector.
 */
export const Table = <RecordType = unknown>({
  records,
  recordsPerPage,
  id,
  columns,
}: TableProps<RecordType>) => {
  const {
    filteredArray,
    setFilterColumn,
    setStringFilter,
  } = useTableFiltering({
    records,
    columns,
  });
  const {
    paginatedRecords,
    page,
    setPage,
    totalPages,
  } = usePagination<RecordType>({
    records: filteredArray,
    recordsPerPage,
    startingPage: 0,
  });

  return <table id={id}>
    <thead>
    {columns.map(column => <th>{column.getHeader(records)}</th>)}
    </thead>
    <tbody>
    {paginatedRecords.map((record) =>
      <tr>
        {columns.map(column =>
          <td>
            {column.getCell(record)}
          </td>
        )}
      </tr>
    )}
    </tbody>
  </table>;
};