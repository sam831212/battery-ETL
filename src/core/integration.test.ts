
import { describe, it, expect } from 'vitest';
import { loadDataAndPreprocess } from './ingestors/BaseIngestor';
import { transformData } from './transformers/data_transformer';
import { validateData } from './validators/data_validator';
import { persistData } from './persistors/database_persistor';

// Mock or import representative data for integration
const mockRawData = [
  { id: 1, voltage: 3.7, current: 1.5, temperature: 25, timestamp: '2024-01-01T00:00:00Z' },
  { id: 2, voltage: 3.8, current: 1.6, temperature: 26, timestamp: '2024-01-01T00:01:00Z' }
];

describe('Pipeline Integration Test', () => {
  it('should process data through ingestion, transformation, validation, and persistence', async () => {
    // Ingestion & Preprocessing
    const ingested = await loadDataAndPreprocess(mockRawData);
    expect(ingested).toBeDefined();
    expect(Array.isArray(ingested)).toBe(true);
    // Transformation
    const transformed = transformData(ingested);
    expect(transformed).toBeDefined();
    expect(Array.isArray(transformed)).toBe(true);
    // Validation
    const validationResult = validateData(transformed);
    expect(validationResult.success).toBe(true);
    // Persistence (simulate DB save)
    const persistResult = await persistData(transformed);
    expect(persistResult.success).toBe(true);
  });
});