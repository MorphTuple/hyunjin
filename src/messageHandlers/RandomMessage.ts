import { IHyunjinMessageHandler } from "../interfaces/IHyunjinMessageHandler"

const randomMessage : IHyunjinMessageHandler = {
    label : 'randomMessenger',
    trigger : () => Math.random() < .01,
    generator : (msg) => {
        // You can implement custom message reactions here
        msg.channel.createMessage('Wow, I make this message on very small occasions')
    }
}

export default randomMessage