import { IHyunjinMessageHandler } from "../interfaces/IHyunjinMessageHandler";
// default node url lib is deprecated, use whatwg-url instead
import { parseURL, serializeURL } from 'whatwg-url'
import querystring from 'querystring'
import { URL_REGEX } from "../constants";
import loadClearUrl from "../helpers/loadClearUrlDefinitions";

const clearUrlRules = loadClearUrl()

const clearURL : IHyunjinMessageHandler = {
    label : 'clearURL',
    trigger : (msg) => URL_REGEX.test(msg.content),
    generator : async (msg) => {
        const urls = msg.content.match(URL_REGEX)
        if(!urls) return
        
        const mainUrl = urls[0]
        // const detectedProviders : IClearURLProvider[] = []
        // for(let provider of clearUrlRules){
        //     if(provider.urlPattern.test(mainUrl)){
        //         msg.channel.createMessage(`Url pattern detected : ${provider.providerName}`)
        //         detectedProviders.push(provider)
        //     }
        // }

        // console.log(detectedProviders)
        // console.log(parsedUrl)

    }
}

export default clearURL;
