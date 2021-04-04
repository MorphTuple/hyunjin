import { CommandClient } from 'eris';
import config from './config';
import commands from './commands/index';
import messageHandlers from './messageHandlers/index'

const hyunjin = new CommandClient(config.botToken, {}, {
    prefix: config.prefix,
});

hyunjin.on('messageCreate', (msg) => {
    if(msg.command || msg.author.bot) return;
    messageHandlers.forEach(e => {
        if(e.trigger(msg)) e.generator(msg)
    })
})

commands.forEach((e) => {
    hyunjin.registerCommand(e.label, e.generator, e.options);
});

hyunjin.connect().then(async () => {
    console.log(`Hyunjin is now online with the prefix ${config.prefix}`);
});
