import { CommandClient } from 'eris';
import config from './config';
import commands from './commands/index';

const hyunjin = new CommandClient(config.botToken, {}, {
    prefix: config.prefix,
});

commands.forEach((e) => {
    hyunjin.registerCommand(e.label, e.generator, e.options);
});

hyunjin.connect().then(async () => {
    console.log(`Hyunjin is now online with the prefix ${config.prefix}`);
});
