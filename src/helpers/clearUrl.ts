import loadClearUrlDefinitions from "./loadClearUrlDefinitions";
import { parseURL, serializeURL } from 'whatwg-url'
import querystring from 'querystring'

const definitions = loadClearUrlDefinitions()

export default function clearUrl(url : string) : string{
    let parsed = parseURL(url)
    if(!parsed) return url

    let queries = parsed.query ? querystring.parse(parsed.query) : {}

    for(let provider of definitions){
        if(provider.urlPattern.test(url)){
            if(!provider.rules) continue
            console.log('provider rules', provider.rules)

            // TODO algorithm might be improvable?
            for(let rule of provider.rules){
                let exp = new RegExp(rule, 'g')
            
                for(let query in queries){
                    if(exp.test(query)){
                        delete queries[query]
                    }
                    exp.lastIndex = 0
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

    parsed.query = querystring.stringify(queries)
    const res = serializeURL(parsed)

    return res === url + '?' ? url : res
}