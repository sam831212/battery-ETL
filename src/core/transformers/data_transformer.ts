import { z } from 'zod';
import { DatabaseSchema } from '../interfaces/database';

/**
 * Data transformer class responsible for mapping and reformatting data
 * based on the target database schema
 */
export class DataTransformer {
  private schema: DatabaseSchema;

  constructor(schema: DatabaseSchema) {
    this.schema = schema;
  }

  /**
   * Transform raw test data to match the database schema
   */
  public transformTestData(rawData: any) {
    try {
      const transformedData = {
        name: String(rawData.name || ''),
        description: rawData.description || null,
        machine_type: String(rawData.machine_type || ''),
        experiment_type: String(rawData.experiment_type || ''),
        nominal_capacity: rawData.nominal_capacity ? Number(rawData.nominal_capacity) : null,
        imported_by: rawData.imported_by || null,
      };

      return transformedData;
    } catch (error) {
      console.error('Error transforming test data:', { rawData, error });
      throw new Error(`Failed to transform test data: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Transform raw step data to match the database schema
   */
  public transformStepData(rawData: any, testId: number) {
    try {
      const transformedData = {
        test_id: testId,
        step_number: Number(rawData.step_number),
        step_type: String(rawData.step_type || ''),
        start_time: new Date(rawData.start_time).toISOString(),
        end_time: new Date(rawData.end_time).toISOString(),
        duration: Number(rawData.duration || 0),
        capacity: rawData.capacity ? Number(rawData.capacity) : null,
        energy: rawData.energy ? Number(rawData.energy) : null,
        c_rate: rawData.c_rate ? Number(rawData.c_rate) : null,
        start_voltage: rawData.start_voltage ? Number(rawData.start_voltage) : null,
        end_voltage: rawData.end_voltage ? Number(rawData.end_voltage) : null,
        start_current: rawData.start_current ? Number(rawData.start_current) : null,
        end_current: rawData.end_current ? Number(rawData.end_current) : null,
        min_temperature: rawData.min_temperature ? Number(rawData.min_temperature) : null,
        max_temperature: rawData.max_temperature ? Number(rawData.max_temperature) : null,
      };

      return transformedData;
    } catch (error) {
      console.error('Error transforming step data:', { rawData, testId, error });
      throw new Error(`Failed to transform step data: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Transform raw detail data to match the database schema
   */
  public transformDetailData(rawData: any, stepId: number) {
    try {
      const transformedData = {
        step_id: stepId,
        timestamp: new Date(rawData.timestamp).toISOString(),
        voltage: Number(rawData.voltage || 0),
        current: Number(rawData.current || 0),
        temperature: rawData.temperature ? Number(rawData.temperature) : null,
        capacity: rawData.capacity ? Number(rawData.capacity) : null,
        energy: rawData.energy ? Number(rawData.energy) : null,
      };

      return transformedData;
    } catch (error) {
      console.error('Error transforming detail data:', { rawData, stepId, error });
      throw new Error(`Failed to transform detail data: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Validate and transform array of data
   */
  public transformBatch<T>(dataArray: any[], transformFn: (data: any, ...args: any[]) => T, ...args: any[]): T[] {
    return dataArray.map((item) => transformFn.call(this, item, ...args));
  }

  /**
   * Transform input data according to the provided schema mapping
   */
  // 新增獨立導出函數，符合測試需求
}

export function transformData(input: any, schema: Record<string, string>) {
  if (Array.isArray(input)) {
    return input.map(item => {
      const result: any = {};
      for (const key in schema) {
        result[key] = item[schema[key]];
      }
      return result;
    });
  }
  
  const result: any = {};
  for (const key in schema) {
    result[key] = input[schema[key]];
  }
  return result;
}