import { IHyunjinCommand } from "../interfaces/IHyunjinCommand";

const ping : IHyunjinCommand = {
    label : 'ping',
    generator : async (msg, args) => {
        const past = Date.now()
        const sent = await msg.channel.createMessage('Pinging 🏓')
        sent.edit(`Latency is around ${Date.now() - past}ms`)
    },
    options : {
        description : 'Returns the bot ping information'
    }
}

export default ping