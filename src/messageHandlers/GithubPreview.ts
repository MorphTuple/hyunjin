import { parseURL } from 'whatwg-url';
import { IHyunjinMessageHandler } from '../interfaces/IHyunjinMessageHandler';
import { HYUNJIN_COLOR, URL_REGEX } from '../constants';
import { getColorFromLanguage, getRepositoryInfo } from '../helpers/githubApi';

const githubPreview : IHyunjinMessageHandler = {
    label: 'clearURL',
    trigger: null,
    generator: async (msg) => {
        if (!URL_REGEX.test(msg.content)) return false;
        const urls = msg.content.match(URL_REGEX);
        if (!urls) return false;

        const mainUrl = urls[0];
        const parsed = parseURL(mainUrl);

        if (parsed?.host !== 'github.com') return;
        if (parsed.path.length < 2) return;

        const author = parsed.path[0];
        const repoName = parsed.path[1];

        const repositoryInfo = await getRepositoryInfo(author, repoName);
        if (!repositoryInfo) return;

        const languageColor = getColorFromLanguage(repositoryInfo.language);

        msg.channel.createMessage({
            embed: {
                color: languageColor,
                fields: [
                    {
                        name: '📙 Language',
                        value: repositoryInfo.language || 'Unknown Language',
                        inline: true,
                    },
                    {
                        name: '⚖️ License',
                        value: repositoryInfo.license ? repositoryInfo.license.name : 'No license provided',
                        inline: true,
                    },
                    {
                        name: '🌟 Stars',
                        value: String(repositoryInfo.stargazers_count),
                        inline: true,
                    },
                ],
            },
        });
    },
};

export default githubPreview;
