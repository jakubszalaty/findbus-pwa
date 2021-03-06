// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    serverUri: 'https://zditm-graphql.test',
    serverApiUri: 'https://zditm-graphql.test/graphql',
    serverApiWebsocketUri: 'wss://ws-zditm-graphql.test/subscriptions',
    googleMapsApiKey: 'AIzaSyDeJ3Rsxjqf4IqgSZcZQ03ZX_y3CwkkY3w'
}
