import { Message } from 'eris';

export interface IHyunjinMessageHandler{
    label : string
    trigger : null | ((msg : Message) => boolean)
    generator : (msg : Message) => void
}
