import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { User } from './models/user.model';

export const databaseProviders = [{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        let config: any = {};
        switch (process.env.NODE_ENV) {
        case 'development':
           config = databaseConfig.development;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User]);
        await sequelize.sync();
        return sequelize;
    },
}];