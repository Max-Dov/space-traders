import { ReactNode } from 'react';
import React from 'react';
import { usePagination, useTableFiltering, useTableSorting } from '@utils';
import './table.styles.scss';

export interface TableColumn<RecordType> {
  /**
   * Column ID, e.g. "ship-name".
   */
  id: string;
  /**
   * Whatever goes into <th>.
   */
  getHeader: (records: Array<RecordType>) => ReactNode;
  /**
   * Whatever goes into <td>. Can be left empty if `renderRow` function is defined in `TableProps`.
   */
  getCell?: (record: RecordType) => ReactNode;
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
   */
  id: string;
  records: Array<RecordType>;
  recordsPerPage: number;
  columns: Array<TableColumn<RecordType>>;
  tableName: ReactNode;
  /**
   * Custom row renderer function.
   */
  renderRow?: (record: RecordType) => ReactNode;
  enableFiltering?: boolean;
  enableSorting?: boolean;
  /**
   * Classname that would be passed to `<table>`.
   */
  className?: string;
}

/**
 * Logic wrapper for tables with minimal styling.
 */
export const Table = <RecordType = unknown>({
  records,
  recordsPerPage,
  id,
  columns,
  tableName,
  renderRow,
  enableSorting,
  enableFiltering,
  className,
}: TableProps<RecordType>) => {
  const {
    filteredRecords,
    setFilterColumn,
    setStringFilter,
  } = useTableFiltering({ records, columns });
  const {
    sortedRecords,
    setSortColumn
  } = useTableSorting({ records: filteredRecords, columns });
  const {
    paginatedRecords,
    page,
    setPage,
    totalPages,
  } = usePagination<RecordType>({
    records: sortedRecords,
    recordsPerPage,
    startingPage: 0,
  });

  return (
    <>
      <div className="table-controls-row">
        <span className="table-name">
          {tableName}
        </span>
      </div>
      <table className={className}>
        <thead>
          {columns.map(column => column.getHeader(records))}
        </thead>
        <tbody>
          {paginatedRecords.map((record) => {
              if (renderRow) {
                return renderRow(record);
              }
              return <tr>
                {columns.map(column => {
                    if (column.getCell) {
                      return column.getCell(record);
                    } else {
                      return <td></td>;
                    }
                  }
                )}
              </tr>;
            }
          )}
        </tbody>
      </table>
    </>
  );
};