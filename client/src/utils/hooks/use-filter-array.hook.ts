interface UseFilterArrayProps<RecordType> {
  records: Array<RecordType>;
  /**
   * Function to transform record in string value that can be checked against filterByString.
   */
  transformRecordToFilterValue: ((record: RecordType) => string) | null;
  /**
   * Value to filter by.
   */
  stringFilter: string | null;
}

/**
 * Filters array against string value.
 * For null stringFilter returns origin array.
 */
export const useFilterArray = <RecordType>({
  records,
  transformRecordToFilterValue,
  stringFilter,
}: UseFilterArrayProps<RecordType>) =>
  stringFilter === null || transformRecordToFilterValue === null
    ? records
    : records.filter(record => transformRecordToFilterValue(record).includes(stringFilter));