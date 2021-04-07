interface IClearURLProvider{
    urlPattern : RegExp,
    rules : RegExp[] | undefined,
    redirections : string[] | undefined,
    providerName : string,
    completeProvider : boolean | undefined
}

export default IClearURLProvider;