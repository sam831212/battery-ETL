import { FilterCriteria, RangeFilter } from "./filter_criteria";
// Import your database persistor or ORM here
// import { DatabasePersistor } from '../core/persistors/database_persistor';

export class QueryManager {
  // dbPersistor: DatabasePersistor;
  private mockData: any[] = [];

  constructor(/*dbPersistor: DatabasePersistor*/) {
    // this.dbPersistor = dbPersistor;
    // For testing purposes, we'll use mock data
    this.mockData = [
      { id: 1, date: "2023-01-01", voltage: 3.7, current: 1.2, soc: 80, temperature: 25, c_rate: 1, step_type: "charge" },
      { id: 2, date: "2023-01-02", voltage: 3.8, current: 1.0, soc: 90, temperature: 26, c_rate: 0.5, step_type: "discharge" },
      { id: 3, date: "2023-01-03", voltage: 3.6, current: 1.5, soc: 70, temperature: 24, c_rate: 2, step_type: "charge" },
      { id: 4, date: "2023-01-04", voltage: 3.9, current: 0.8, soc: 95, temperature: 27, c_rate: 0.2, step_type: "rest" }
    ];
  }

  private checkRange(value: number, range?: RangeFilter): boolean {
    if (!range) return true;
    if (range.min !== undefined && value < range.min) return false;
    if (range.max !== undefined && value > range.max) return false;
    return true;
  }

  private checkDateRange(date: string, range?: { start?: Date | string; end?: Date | string }): boolean {
    if (!range) return true;
    const dateObj = new Date(date);
    if (range.start && dateObj < new Date(range.start)) return false;
    if (range.end && dateObj > new Date(range.end)) return false;
    return true;
  }

  /**
   * Filter an array of data using the provided filter criteria.
   * @param data The data array to filter
   * @param filters The filter criteria object
   * @returns The filtered data array
   */
  filterData(data: any[], filters: FilterCriteria): any[] {
    return data.filter(item => {
      if (!this.checkDateRange(item.date, filters.dateRange)) return false;
      if (!this.checkRange(item.voltage, filters.voltage)) return false;
      if (!this.checkRange(item.current, filters.current)) return false;
      if (!this.checkRange(item.soc, filters.soc)) return false;
      if (!this.checkRange(item.temperature, filters.temperature)) return false;
      if (!this.checkRange(item.c_rate, filters.cRate)) return false;
      if (filters.stepTypes && filters.stepTypes.length > 0 && !filters.stepTypes.includes(item.step_type)) return false;
      return true;
    });
  }

  /**
   * Query the database using the provided filter criteria.
   * @param filters The filter criteria object
   * @returns Promise resolving to the filtered data array
   */
  async queryData(filters: FilterCriteria): Promise<any[]> {
    // For testing purposes, we'll use the mock data
    return this.filterData(this.mockData, filters);
  }
}

// Singleton export for convenience
export const queryManager = new QueryManager();