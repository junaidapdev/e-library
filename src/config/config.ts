import {config as Conf} from 'dotenv';

Conf();

const _config = {
    port: process.env.PORT,
    dataBaseUrl: process.env.MONGO_CONNECTION_STRING
}

export const config = Object.freeze(_config);