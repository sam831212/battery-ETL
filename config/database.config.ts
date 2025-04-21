// PostgreSQL 数据库连接配置
export const postgresConfig = {
  connectionString: "postgresql://postgres:1212@localhost:5432/battery_db"
};

// 使用说明:
// 1. 替换username, password, localhost, 5432和database_name为您的实际数据库信息
// 2. 在其他文件中导入使用: import { postgresConfig } from '../config/database.config';
// 3. 创建DatabasePersistor实例: new DatabasePersistor(postgresConfig.connectionString, 'table_name')