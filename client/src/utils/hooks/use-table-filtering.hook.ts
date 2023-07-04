import { useState } from 'react';
import { TableColumn } from '@shared';
import { useFilterArray } from '@utils';

interface UseTableFilteringProps<RecordType> {
  records: Array<RecordType>;
  columns: Array<TableColumn<RecordType>>;
}

/**
 * Provides filtered records if filter options are provided.
 * Returns control functions to update filter options.
 * For null options returns original records.
 */
export const useTableFiltering = <RecordType>({
  records,
  columns,
}: UseTableFilteringProps<RecordType>) => {
  const [stringFilter, setStringFilter] = useState<string | null>(null);
  const [filterColumn, setFilterColumn] = useState<string | null>(null);
  const getFilterValue = columns.find(column => column.id === filterColumn)?.getFilterValue || null;

  const filteredRecords = useFilterArray({
    records,
    transformRecordToFilterValue: getFilterValue,
    stringFilter,
  });

  return {
    filteredRecords,
    setStringFilter,
    setFilterColumn,
  };
};