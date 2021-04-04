import { config as loadDotenv } from 'dotenv';
import { IHyunjinConfig } from './interfaces/IHyunjinConfig';

loadDotenv();

const config : IHyunjinConfig = {
    botToken: process.env.TOKEN,
    prefix: process.env.PREFIX || 'hy!',
};

export default config;
