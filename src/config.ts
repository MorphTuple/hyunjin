import { config as loadDotenv } from 'dotenv';
import { IHyunjinConfig } from './interfaces/IHyunjinConfig';

loadDotenv();

// Better handling of typescript error of token being undefined
if(!process.env.TOKEN){
    console.error('Token not found!')
    process.exit()
}

const config : IHyunjinConfig = {
    botToken: process.env.TOKEN,
    prefix: process.env.PREFIX || 'hy!',
};

export default config;
