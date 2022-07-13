import { DataSource } from 'typeorm';
import { config } from './config/config';

export const databaseProviders = [
  {
    provide: ' Dynamic_Module',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUsername,
        password: config.dbPassword,
        database: config.dbDatabase,
        entities: ['dist//**/**.entity{.ts,.js}'],
        bigNumberStrings: false,
        // logging: true,
        // synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
