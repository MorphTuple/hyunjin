import fs from 'fs'
import path from 'path'
import IClearURLProvider from '../interfaces/IClearURLProvider'

export default function loadClearUrlDefinitions() : IClearURLProvider[] {
    const rawData = fs.readFileSync(path.join(__dirname, '../assets/clearurl_rules.json'), { encoding : 'utf-8' })
    
    // untyped territory
    const data = JSON.parse(rawData)
    const ret : IClearURLProvider[] = []
    for (let i in data['providers']){
        ret.push({
            ...data['providers'][i],
            urlPattern : new RegExp(data['providers'][i]['urlPattern']),
            providerName : i
        })
    }

    return ret;
}