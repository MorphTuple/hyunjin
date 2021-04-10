import { IHyunjinMessageHandler } from '../interfaces/IHyunjinMessageHandler';
import { HYUNJIN_GREEN_COLOR, URL_REGEX } from '../constants';
import clearUrl from '../helpers/clearUrl';

const dirtyUrlObserver : IHyunjinMessageHandler = {
    label: 'clearURL',
    trigger: (msg) => URL_REGEX.test(msg.content),
    generator: async (msg) => {
        const urls = msg.content.match(URL_REGEX);
        if (!urls) return;

        const mainUrl = urls[0];
        const cleanedUrl = clearUrl(mainUrl);

        if (mainUrl === cleanedUrl) return;
        await msg.channel.createMessage({
            embed: {
                title: '🔗 URL with trackers detected! Click here instead for safer URL 🔗',
                color: HYUNJIN_GREEN_COLOR,
                url: cleanedUrl,
            },
        });
    },
};

export default dirtyUrlObserver;
