import { Embed } from 'eris';
import { IHyunjinCommand } from '../interfaces/IHyunjinCommand';
import {
    createEvalRequest, genereateJudgeZeroMessage, getAvailableLanguages, getEvalResult,
} from '../helpers/judgeZero';

const nodeEvalLangId = 63;

const evalCmd : IHyunjinCommand = {
    label: 'eval',
    generator: async (msg, args) => {
        const codeBlock = msg.content.substring(msg.content.indexOf('`'), msg.content.lastIndexOf('`') + 1).split('\n');
        codeBlock.pop();
        codeBlock.shift();
        const code = codeBlock.join('\n');

        const req = await createEvalRequest({
            language_id: nodeEvalLangId,
            source_code: code,
        });

        const result = await getEvalResult(req.token);
        const responseMsg = genereateJudgeZeroMessage(msg, result);

        msg.channel.createMessage(responseMsg);
    },
    options: {
        description: 'Evaluates a programming expression',
    },
};

export default evalCmd;
