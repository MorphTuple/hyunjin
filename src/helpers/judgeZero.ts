import axios from 'axios';
import Eris, { Embed, EmbedOptions, MessageContent } from 'eris';

const client = axios.create({
    baseURL: 'https://judge0-ce.p.rapidapi.com',
    headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': process.env.JUDGE0_API_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        useQueryString: true,
    },
});

interface JudgeZeroLanguage{
    id : number,
    name : string
}

interface JudgeZeroRequestBody{
    language_id : number
    source_code : string
}

interface JudgeZeroPostResponse{
    token : string
}

interface JudgeZeroGetResponse{
    status_id : number
    stdout : string
    stderr : string
    message : string
    memory : number
    time : string
    compile_output : string
}

const judgeZeroSubmissionParams = {
    base64_encoded: true,
    fields: '*',
};

export async function getAvailableLanguages() : Promise<JudgeZeroLanguage[]> {
    const res = await client.get('/languages');
    return res.data;
}

export async function createEvalRequest(body : JudgeZeroRequestBody) : Promise<JudgeZeroPostResponse> {
    body.source_code = Buffer.from(body.source_code, 'utf-8').toString('base64');

    const res = await client.post('/submissions', body, {
        params: judgeZeroSubmissionParams,
    });

    return res.data;
}

export async function getEvalResult(token : string) : Promise<JudgeZeroGetResponse> {
    const res = await client.get(`/submissions/${token}`, {
        params: judgeZeroSubmissionParams,
    });

    const { data } = res;

    if (data.stdout != null && data.stdout != '') {
        data.stdout = Buffer.from(data.stdout, 'base64').toString();
    }

    if (data.compile_output != null && data.compile_output != '') {
        data.compile_output = Buffer.from(data.compile_output, 'base64').toString('binary');
    }

    return data;
}

export async function attemptGetEvalResult(token : string, maxRetry = 5) : Promise<JudgeZeroGetResponse> {
    let res = await getEvalResult(token);
    for (let i = 0; i < maxRetry && res.status_id === 2; i++) {
        res = await getEvalResult(token);
    }

    if (res.status_id === 2) {
        throw new Error(`${maxRetry} request attempts has been made`);
    }

    return res;
}

export function genereateJudgeZeroMessage(originalMsg : Eris.Message<Eris.TextableChannel>, result : JudgeZeroGetResponse) : MessageContent {
    if (result.stderr) {
        let msg = `An error occured when evaluating your code: **${result.stderr}**`;
        if (result.message) {
            msg += `\nHere's some extra message for you: **${result.message}**`;
        }
        return { content: msg };
    }

    if (!result.stdout) {
        if (result.compile_output) {
            let msg = `Sorry! I cannot compile your code. Here's some error message: ${result.compile_output}`;
            if (msg.length > 2047) {
                msg = 'Sorry! I cannot compile your code. The error message is also too long!';
            }
            return { content: msg };
        }
    }

    const description = `Here is the evaluation result of ${originalMsg.author.mention}'s code\n\`\`\`bash\n${result.stdout}\n\`\`\``;
    if (description.length > 2047) {
        return { content: 'Sorry! The length of the evaluation result of your code is too long!' };
    }

    return {
        embed: {
            color: 0xf1e05a,
            description,
            fields: [
                {
                    name: 'Time spent',
                    value: `${result.time} sec`,
                    inline: true,
                },
                {
                    name: 'Memory spent',
                    value: `${Math.round(result.memory)} KB`,
                    inline: true,
                },
            ],
            author: {
                name: originalMsg.author.username,
                icon_url: originalMsg.author.avatarURL,
            },
            thumbnail: {
                url: 'https://raw.githubusercontent.com/voodootikigod/logo.js/master/js.png',
            },
        },
    };
}
