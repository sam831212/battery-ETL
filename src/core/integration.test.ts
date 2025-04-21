import { describe, it, expect } from 'vitest';
import { BaseIngestor } from './ingestors/BaseIngestor';
import { transformData } from './transformers/data_transformer';
import { validateTransformedData } from './validators/validation_schema';
import DatabasePersistor from './persistors/database_persistor';

// Mock or import representative data for integration
const mockRawData = [
  { id: 1, voltage: 3.7, current: 1.5, temperature: 25, timestamp: '2024-01-01T00:00:00Z' },
  { id: 2, voltage: 3.8, current: 1.6, temperature: 26, timestamp: '2024-01-01T00:01:00Z' }
];

// Define schema mapping for transformation
const schema = {
  id: 'id',
  voltage: 'voltage',
  current: 'current',
  temperature: 'temperature',
  timestamp: 'timestamp'
};

class MockIngestor extends BaseIngestor {
  async loadData(file: any): Promise<any> {
    return file;
  }
  
  async preprocess(data: any): Promise<any> {
    return data;
  }
}

describe('Pipeline Integration Test', () => {
  it('should process data through ingestion, transformation, validation, and persistence', async () => {
    const ingestor = new MockIngestor(
      { requiredColumns: ['id', 'voltage', 'current', 'temperature', 'timestamp'], headerRows: 0, timestampFormat: 'ISO' },
      { machineType: 'test', fileFormat: 'json', dateFormat: 'ISO' }
    );
    
    // Ingestion & Preprocessing
    const ingested = await ingestor.loadDataAndPreprocess(mockRawData);
    expect(ingested).toBeDefined();
    expect(Array.isArray(ingested)).toBe(true);
    // Transformation
    const transformed = transformData(ingested, schema);
    expect(transformed).toBeDefined();
    expect(Array.isArray(transformed)).toBe(true);
    // Validation
    const validationResult = validateTransformedData(transformed);
    expect(validationResult.success).toBe(true);
    // Persistence (simulate DB save)
    const persistor = new DatabasePersistor('postgresql://postgres:1212@localhost:5432/battery_db', 'test_table');
    await persistor.saveBatch(transformed);
    expect(true).toBe(true); // If we get here without error, persistence was successful
  });
});