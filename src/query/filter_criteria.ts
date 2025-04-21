// Filtering criteria definitions for battery data querying

export type RangeFilter = {
  min?: number;
  max?: number;
};

export type DateRangeFilter = {
  start?: Date | string;
  end?: Date | string;
};

export type StepType =
  | "charge"
  | "discharge"
  | "rest"
  | "ocv"
  | "other";

export interface FilterCriteria {
  dateRange?: DateRangeFilter;
  voltage?: RangeFilter;
  current?: RangeFilter;
  soc?: RangeFilter;
  temperature?: RangeFilter;
  cRate?: RangeFilter;
  stepTypes?: StepType[];
  [key: string]: any; // For extensibility
}

// Example default filter
export const defaultFilterCriteria: FilterCriteria = {
  dateRange: undefined,
  voltage: undefined,
  current: undefined,
  soc: undefined,
  temperature: undefined,
  cRate: undefined,
  stepTypes: [],
};

// UI integration note: Use these types to build dynamic filter forms and validate user input.