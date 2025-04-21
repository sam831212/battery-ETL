import { BasePersistor } from "./base_persistor";

// Example: Using SQLite for demonstration; replace with actual DB logic as needed
import Database from "better-sqlite3";

export class DatabasePersistor<T = any> implements BasePersistor<T> {
  private db: Database.Database;
  private tableName: string;

  constructor(dbPath: string, tableName: string) {
    this.db = new Database(dbPath);
    this.tableName = tableName;
    // You may want to create the table if it doesn't exist
    // This is a placeholder; adjust schema as needed
    this.db.prepare(`CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)`).run();
  }

  async save(record: T): Promise<void> {
    const stmt = this.db.prepare(`INSERT INTO ${this.tableName} (data) VALUES (?)`);
    stmt.run(JSON.stringify(record));
  }

  async saveBatch(records: T[]): Promise<void> {
    const insert = this.db.prepare(`INSERT INTO ${this.tableName} (data) VALUES (?)`);
    const transaction = this.db.transaction((batch: T[]) => {
      for (const record of batch) {
        insert.run(JSON.stringify(record));
      }
    });
    transaction(records);
  }

  async close(): Promise<void> {
    this.db.close();
  }
}

export default DatabasePersistor;