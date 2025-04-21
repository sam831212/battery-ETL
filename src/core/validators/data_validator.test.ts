import { describe, it, expect } from 'vitest';
import { validateData, dataSchema } from './data_validator';

describe('DataValidator', () => {
  it('should validate correct data', () => {
    const validData = { voltage: 3.7, current: 1.5, soc: 80 };
    const result = validateData(validData);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid data', () => {
    const invalidData = { voltage: 'bad', current: null, soc: -10 };
    const result = validateData(invalidData);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});