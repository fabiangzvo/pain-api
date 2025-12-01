import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  synchronize: false,
  ssl: true,
};

export function dataSourceFactory(
  options: DataSourceOptions,
): Promise<DataSource> {
  return new DataSource(options).initialize();
}
