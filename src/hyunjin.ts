import { CommandClient } from 'eris';
import config from './config';
import commands from './commands/index';

const hyunjin = new CommandClient(config.botToken, {}, {
    prefix: config.prefix,
});

console.log(config.botToken);

commands.forEach((e) => {
    hyunjin.registerCommand(e.label, e.generator, e.options);
});

hyunjin.connect().then(async () => {
    const self = await hyunjin.getSelf();
    console.log(`${self.username} is now online and serving ${hyunjin.guilds.size} guilds!`);
});
