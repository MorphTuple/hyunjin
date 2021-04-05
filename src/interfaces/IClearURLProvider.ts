interface IClearURLProvider{
    urlPattern : RegExp,
    rules : string[] | undefined,
    redirections : string[] | undefined,
    providerName : string,
    completeProvider : boolean | undefined
}

export default IClearURLProvider;