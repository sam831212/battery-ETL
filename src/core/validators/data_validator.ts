import { z } from 'zod';

/**
 * Zod schemas for validating battery test data
 */
export const testSchema = z.object({
  name: z.string().min(1, 'Test name is required'),
  description: z.string().nullable(),
  machine_type: z.string().min(1, 'Machine type is required'),
  experiment_type: z.string().min(1, 'Experiment type is required'),
  nominal_capacity: z.number().nullable(),
  imported_by: z.string().nullable(),
});

export const stepSchema = z.object({
  test_id: z.number().int().positive('Test ID must be a positive integer'),
  step_number: z.number().int().min(0, 'Step number must be non-negative'),
  step_type: z.string().min(1, 'Step type is required'),
  start_time: z.string().datetime('Invalid start time format'),
  end_time: z.string().datetime('Invalid end time format'),
  duration: z.number().min(0, 'Duration must be non-negative'),
  capacity: z.number().nullable(),
  energy: z.number().nullable(),
  c_rate: z.number().nullable(),
  start_voltage: z.number().nullable(),
  end_voltage: z.number().nullable(),
  start_current: z.number().nullable(),
  end_current: z.number().nullable(),
  min_temperature: z.number().nullable(),
  max_temperature: z.number().nullable(),
});

export const detailSchema = z.object({
  step_id: z.number().int().positive('Step ID must be a positive integer'),
  timestamp: z.string().datetime('Invalid timestamp format'),
  voltage: z.number(),
  current: z.number(),
  temperature: z.number().nullable(),
  capacity: z.number().nullable(),
  energy: z.number().nullable(),
});

export const dataSchema = z.object({
  voltage: z.number(),
  current: z.number(),
  soc: z.number().min(0).max(100)
});

export function validateData(data: unknown) {
  return dataSchema.safeParse(data);
}

/**
 * Data validator class for enforcing schema integrity
 */
export class DataValidator {
  /**
   * Validate test data against the schema
   */
  public validateTest(data: unknown) {
    try {
      return testSchema.parse(data);
    } catch (error) {
      console.error('Validation error in test data:', { data, error });
      if (error instanceof z.ZodError) {
        throw new Error(
          `Test data validation failed: ${error.errors.map(e => e.message).join('; ')}`
        );
      }
      throw new Error('Unknown validation error in test data');
    }
  }

  /**
   * Validate step data against the schema
   */
  public validateStep(data: unknown) {
    try {
      return stepSchema.parse(data);
    } catch (error) {
      console.error('Validation error in step data:', { data, error });
      if (error instanceof z.ZodError) {
        throw new Error(
          `Step data validation failed: ${error.errors.map(e => e.message).join('; ')}`
        );
      }
      throw new Error('Unknown validation error in step data');
    }
  }

  /**
   * Validate detail data against the schema
   */
  public validateDetail(data: unknown) {
    try {
      return detailSchema.parse(data);
    } catch (error) {
      console.error('Validation error in detail data:', { data, error });
      if (error instanceof z.ZodError) {
        throw new Error(
          `Detail data validation failed: ${error.errors.map(e => e.message).join('; ')}`
        );
      }
      throw new Error('Unknown validation error in detail data');
    }
  }

  /**
   * Validate array of data against the schema
   */
  public validateBatch<T>(dataArray: unknown[], validationFn: (data: unknown) => T): T[] {
    return dataArray.map((item) => validationFn.call(this, item));
  }

  /**
   * Safe validation that returns result instead of throwing
   */
  public safeValidate<T>(data: unknown, schema: z.ZodType<T>) {
    try {
      const result = schema.parse(data);
      return { success: true, data: result, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Safe validation error:', { data, error: error.errors });
        return { success: false, data: null, error: error.errors };
      }
      console.error('Unknown safe validation error:', { data, error });
      return { success: false, data: null, error: [{ message: 'Unknown validation error' }] };
    }
  }
}