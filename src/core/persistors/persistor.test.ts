import { describe, it, expect } from 'vitest';
import { BasePersistor } from './base_persistor';
import { DatabasePersistor } from './database_persistor';

describe('BasePersistor', () => {
  it('should throw error if save is not implemented', () => {
    class DummyPersistor extends BasePersistor {}
    const persistor = new DummyPersistor();
    expect(() => persistor.save({})).toThrow();
  });
});

describe('DatabasePersistor', () => {
  it('should instantiate without error', () => {
    const persistor = new DatabasePersistor();
    expect(persistor).toBeInstanceOf(DatabasePersistor);
  });
  it('should have save method', () => {
    const persistor = new DatabasePersistor();
    expect(typeof persistor.save).toBe('function');
  });
});