import { describe, it, expect } from 'vitest';
import { BaseIngestor } from './BaseIngestor';
import { ArbinIngestor } from './ArbinIngestor';

describe('BaseIngestor', () => {
  it('should throw error if load_data is not implemented', () => {
    class DummyIngestor extends BaseIngestor {}
    const ingestor = new DummyIngestor();
    expect(() => ingestor.load_data('dummy.csv')).toThrow();
  });
});

describe('ArbinIngestor', () => {
  it('should instantiate without error', () => {
    const ingestor = new ArbinIngestor();
    expect(ingestor).toBeInstanceOf(ArbinIngestor);
  });
  it('should have load_data and preprocess methods', () => {
    const ingestor = new ArbinIngestor();
    expect(typeof ingestor.load_data).toBe('function');
    expect(typeof ingestor.preprocess).toBe('function');
  });
});