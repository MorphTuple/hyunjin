import fs from 'fs';
import path from 'path';
import IClearURLProvider from '../interfaces/IClearURLProvider';

export default function loadClearUrlDefinitions() : IClearURLProvider[] {
    const rawData = fs.readFileSync(path.join(__dirname, '../assets/clearurl_rules.json'), { encoding: 'utf-8' });

    // untyped territory
    const data = JSON.parse(rawData);
    const ret : IClearURLProvider[] = [];
    for (const i in data.providers) {
        const provider = data.providers[i];
        const rules : RegExp[] = [];

        if (provider.rules) {
            provider.rules.forEach((e: string) => rules.push(new RegExp(e, 'g')));
        }

        ret.push({
            ...provider,
            rules,
            urlPattern: new RegExp(provider.urlPattern),
            providerName: i,
        });
    }

    return ret;
}
