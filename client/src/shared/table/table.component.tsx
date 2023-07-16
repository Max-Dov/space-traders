import { ReactNode, useState } from 'react';
import React from 'react';
import { usePagination, useTableFiltering, useTableSorting } from '@utils';
import './table.styles.scss';
import { Icon } from '@shared/icon/icon.component';
import { Tooltip } from '@shared/tooltip/tooltip.component';
import { Input } from '@shared/input/input.component';

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
  recordsPerPage: recordsPerPageProp,
  id,
  columns,
  tableName,
  renderRow,
  enableSorting,
  enableFiltering,
  className,
}: TableProps<RecordType>) => {
  const [recordsPerPage, setRecordsPerPage] = useState<number>(recordsPerPageProp);
  const {
    filteredRecords,
    stringFilter,
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

        {/** Pagination */}
        <span className="table-pagination">
          <Tooltip
            isIconTooltip
            tooltipText={<span><strong>Page number</strong><br />Use arrows or type exact page manually [1-{totalPages}].</span>}
            customIcon={<Icon name="Book" />}
          />
          <button
            className="inline-button"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <Icon name="ArrowLeft" />
          </button>
          <input
            value={page + 1}
            onChange={(e) => {
              const number = Number(e.currentTarget.value) - 1;
              setPage(
                Number.isNaN(number)
                  ? 0
                  : Math.max(0, Math.min(number, totalPages - 1)) // make number fit between [0, totalPages]
              );
            }}
            type="number"
            className="inline-input page-number-input"
          />
          {' / '}{totalPages}
          <button
            className="inline-button"
            onClick={() => setPage(page + 1)}
            disabled={page === (totalPages - 1)}
          >
            <Icon name="ArrowRight" />
          </button>
        </span>

        {/** Records Per Page */}
        <span className="table-records-per-page">
          <Tooltip
            isIconTooltip
            tooltipText={<span><strong>Records per page</strong><br />You can change that number [1-100].</span>}
            customIcon={<Icon name="ListPlus" />}
          />
          <input
            value={recordsPerPage}
            onChange={(e) => {
              const number = Number(e.currentTarget.value);
              setRecordsPerPage(
                Number.isNaN(number)
                  ? 1
                  : Math.max(1, Math.min(number, 100)) // make number fit between [1, 100]
              );
            }}
            type="number"
            className="inline-input records-per-page-input"
          />
        </span>

        {/** Filtering */}
        {enableFiltering &&
            <span className="table-filtering">
            <Tooltip
                isIconTooltip
                tooltipText={
                  <span>
                    <strong>Filter records</strong><br />
                    Type something and only records containing that string will shop up.<br />
                  </span>
                }
                customIcon={<Icon name="Funnel" />}
            />
            <input
                value={stringFilter || ''}
                onChange={(e) => setStringFilter(e.currentTarget.value)}
                type="text"
                className="inline-input filter-input"
            />
          </span>
        }

      </div>

      <table className={className}>
        <thead>
          <tr>
            {columns.map(column => column.getHeader(records))}
          </tr>
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
          })}
        </tbody>
      </table>
    </>
  );
};