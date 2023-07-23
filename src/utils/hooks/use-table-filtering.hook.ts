import { useState } from 'react';
import { TableColumn } from '@shared';

interface UseTableFilteringProps<RecordType> {
  records: Array<RecordType>;
  columns: Array<TableColumn<RecordType>>;
}

/**
 * Provides filtered records against string value.
 * Returns control functions to update filter options.
 * For null options returns original records.
 */
export const useTableFiltering = <RecordType>({
  records,
  columns,
}: UseTableFilteringProps<RecordType>) => {
  const [stringFilter, setStringFilter] = useState<string | null>(null);

  const filteredRecords = stringFilter === null
    ? records
    : records.filter(record =>
      columns.some(column =>
        column.getFilterValue && column.getFilterValue(record).toLowerCase().includes(stringFilter.toLowerCase())
      )
    );

  return {
    filteredRecords,
    stringFilter,
    setStringFilter,
  };
};