import { parseURL, serializeURL } from 'whatwg-url';
import querystring from 'querystring';
import loadClearUrlDefinitions from './loadClearUrlDefinitions';

const definitions = loadClearUrlDefinitions();

export default function clearUrl(url : string) : string {
    const parsed = parseURL(url);
    if (!parsed) return url;

    const queries = parsed.query ? querystring.parse(parsed.query) : {};

    for (const provider of definitions) {
        if (provider.urlPattern.test(url)) {
            if (!provider.rules) continue;

            // TODO algorithm might be improvable?
            for (const rule of provider.rules) {
                for (const query in queries) {
                    if (rule.test(query)) {
                        delete queries[query];
                    }
                    rule.lastIndex = 0;
                }
                // for(let pathIndex in parsed.path){
                //     if(new RegExp(rule, 'g').test(parsed.path[pathIndex])){
                //         // TODO: Fix this, pathIndex is a string somehow
                //         console.log(`deleted path ${parsed.path[pathIndex]} because of rule ${rule}`)
                //         // @ts-ignore
                //         parsed.path.splice(pathIndex, 1)
                //     }
                // }
            }
        }
    }

    parsed.query = querystring.stringify(queries);
    const res = serializeURL(parsed);

    return res === `${url}?` ? url : res;
}
