import { Embed } from 'eris';
import { IHyunjinCommand } from "../interfaces/IHyunjinCommand";
import HYUNJIN_COLOR from '../constants';

const about : IHyunjinCommand = {
    label: 'about',
    generator : async (msg, args) => {
        let embed: Embed = {
            author: {
                icon_url: 'https://cdn.discordapp.com/emojis/593518771554091011.png',
                name: 'Hyunjin from Camp Buddy: Scoutmasters\' Season'
            },
            description: 'Hyunjin Choi in the Land of Cute Bois.\nHyunjin Choi is from Camp Buddy: Scoutmasters\' Season by [BLits Games](https://www.blitsgames.com/).\nHyunjin was made and developed by: \n**Arch#0226**, **Tetsuki Syu#1250**\nWritten with: \n[TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/) runtime and [Eris](https://abal.moe/Eris/) library.',
            footer: {
                text: 'Hyunjin Bot: Release 0.1 | 2021-04-05'
            },
            color: HYUNJIN_COLOR,
            thumbnail: {
                url: 'https://cdn.discordapp.com/attachments/811517007446671391/822988374595862548/1200px-Typescript_logo_2020.png'
            },
            type: 'rich',
        };
        await msg.channel.createMessage({ embed: embed });
    },
    options: {
        description: 'Shows the information of Hyunjin.'
    }
}

export default about;