import { useState } from 'react';
import { TableColumn } from '@shared';

// todo lookup MDN for proper sort function ('1' < '2' < '11')
// @ts-ignore
const sortFunction = (a, b) => 1;

// const sortFunction = Intl.NumberFormat

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
  const getFilterValue = columns.find(column => column.id === sortColumn)?.getFilterValue || null;

  const sortedRecords = (sortColumn === null || getFilterValue === null)
    ? records
    : records.sort((record1, record2) => sortFunction(
      getFilterValue(record1),
      getFilterValue(record2),
    ));

  return {
    sortedRecords,
    setSortColumn,
  };
};