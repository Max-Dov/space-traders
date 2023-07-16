import { useState } from 'react';
import { TableColumn } from '@shared';

const sortFunction = new Intl.Collator('en-US', {numeric: true, sensitivity: 'base'}).compare

interface UseTableSortingProps<RecordType> {
  records: Array<RecordType>;
  columns: Array<TableColumn<RecordType>>;
}

/**
 * Provides sorted records if sort options are provided.
 * Returns control functions to update sort options.
 * For null options returns original records.
 */
export const useTableSorting = <RecordType>({
  records,
  columns,
}: UseTableSortingProps<RecordType>) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC' | null>(null);
  const getFilterValue = columns.find(column => column.id === sortColumn)?.getFilterValue || null;

  const sortedRecords = (sortColumn === null || sortDirection === null || getFilterValue === null)
    ? records
    : records.sort((record1, record2) => sortFunction(
      getFilterValue(record1),
      getFilterValue(record2),
    ) * (sortDirection === 'ASC' ? 1 : -1));

  return {
    sortedRecords,
    setSortColumn,
    sortColumn,
    sortDirection,
    setSortDirection,
  };
};