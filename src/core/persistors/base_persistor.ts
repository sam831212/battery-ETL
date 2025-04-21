// Abstract BasePersistor interface for data persistence
export interface BasePersistor<T = any> {
  /**
   * Save a single data record to the persistence backend.
   * @param record - The data record to save
   * @returns A promise that resolves when the operation is complete
   */
  save(record: T): Promise<void>;

  /**
   * Save multiple data records in batch to the persistence backend.
   * @param records - Array of data records to save
   * @returns A promise that resolves when the operation is complete
   */
  saveBatch(records: T[]): Promise<void>;

  /**
   * Optional: Close or cleanup resources (e.g., database connections)
   */
  close?(): Promise<void>;
}