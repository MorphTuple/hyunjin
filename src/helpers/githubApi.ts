import axios from 'axios';
import colors from '../assets/language_colors.json';
import { HYUNJIN_GREEN_COLOR } from '../constants';

interface GithubRepositoryLicense{
    key : string
    name : string
}

interface GithubRepositoryOwner{
    avatar_url : string
}

interface GithubRepository{
    id : string
    name : string
    description : string
    owner : GithubRepositoryOwner
    full_name : string
    language : string
    license : GithubRepositoryLicense
    stargazers_count : number
}

export async function getRepositoryInfo(author : string, repositoryName : string) : Promise<GithubRepository | undefined> {
    const res = await axios.get(`https://api.github.com/repos/${author}/${repositoryName}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
    });

    if (res.status !== 200) {
        return;
    }

    return res.data as GithubRepository;
}

export function getColorFromLanguage(language : string) : number {
    // I'm sorry, but the JSON clearly have it
    // @ts-ignore
    return Number(colors.languages[language]) || HYUNJIN_GREEN_COLOR;
}
