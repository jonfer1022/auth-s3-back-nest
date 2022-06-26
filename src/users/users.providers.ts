import { User } from 'src/database/models/user.model';

export const usersProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: User,
    },
];
