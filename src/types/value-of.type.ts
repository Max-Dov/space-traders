/**
 * Utility type that is useful for extracting enum values.
 */
export type ValueOf<T> = T[keyof T];
