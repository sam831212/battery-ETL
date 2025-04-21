import { describe, it, expect } from 'vitest';
import { transformData } from './data_transformer';

describe('DataTransformer', () => {
  it('should map input fields to target schema', () => {
    const input = { voltage: 3.7, current: 1.5, soc: 80 };
    const schema = { voltage: 'voltage', current: 'current', soc: 'soc' };
    const result = transformData(input, schema);
    expect(result).toEqual({ voltage: 3.7, current: 1.5, soc: 80 });
  });

  it('should handle missing values gracefully', () => {
    const input = { voltage: 3.7 };
    const schema = { voltage: 'voltage', current: 'current', soc: 'soc' };
    const result = transformData(input, schema);
    expect(result).toEqual({ voltage: 3.7, current: undefined, soc: undefined });
  });
});