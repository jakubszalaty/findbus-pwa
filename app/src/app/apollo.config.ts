import { NgModule } from '@angular/core'
import { HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Apollo, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { GC_AUTH_TOKEN } from './constants'
import { getOperationAST } from 'graphql'
import { WebSocketLink } from 'apollo-link-ws'

import { ApolloLink, concat } from 'apollo-link'
import { environment } from '../environments/environment'

@NgModule({
    exports: [HttpClientModule, ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
    constructor(apollo: Apollo, httpLink: HttpLink) {
        const uri = environment.serverApiUri
        const apiWebsocketUri = environment.serverApiWebsocketUri

        const http = httpLink.create({
            uri,
            // headers: { Authorization: authorization },
            withCredentials: false,
        })

        const ws = new WebSocketLink({
            uri: apiWebsocketUri,
        })

        apollo.create({
            link: ApolloLink.split(
                (operation) => {
                    const operationAST = getOperationAST(operation.query, operation.operationName)
                    return !!operationAST && operationAST.operation === 'subscription'
                },
                ws,
                http
            ),

            cache: new InMemoryCache(),
        })
    }
}
