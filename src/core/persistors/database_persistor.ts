import { BasePersistor } from "./base_persistor";

// Example: Using SQLite for demonstration; replace with actual DB logic as needed
import { Pool } from "pg";

export class DatabasePersistor<T = any> implements BasePersistor<T> {
  private pool: Pool;
  private tableName: string;

  constructor(connectionString: string, tableName: string) {
    this.pool = new Pool({
      connectionString,
    });
    this.tableName = tableName;
    
    // Create table if it doesn't exist
    this.pool.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (id SERIAL PRIMARY KEY, data JSONB)`);
  }

  async save(record: T): Promise<void> {
    await this.pool.query(
      `INSERT INTO ${this.tableName} (data) VALUES ($1)`,
      [record]
    );
  }

  async saveBatch(records: T[]): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      for (const record of records) {
        await client.query(
          `INSERT INTO ${this.tableName} (data) VALUES ($1)`,
          [record]
        );
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export default DatabasePersistor;