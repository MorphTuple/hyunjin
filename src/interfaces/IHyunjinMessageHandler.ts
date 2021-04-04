import { Message } from "eris";

export interface IHyunjinMessageHandler{
    label : string
    trigger : (msg : Message) => boolean
    generator : (msg : Message) => void
}
