import { CommandGenerator, CommandOptions } from 'eris';

export interface IHyunjinCommand{
    label: string,
    generator: CommandGenerator,
    options : CommandOptions,
}
