import {config as Conf} from 'dotenv';

Conf();

const _config = {
    port: process.env.PORT
}

export const config = Object.freeze(_config);