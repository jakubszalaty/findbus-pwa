import { Module, MiddlewaresConsumer, NestModule, RequestMethod } from '@nestjs/common'
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql'

import expressPlayground from 'graphql-playground-middleware-express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { importSchema } from 'graphql-import'

import { AppController } from './app.controller'

import { SubscriptionsModule } from './subscription/subscription.module'
import { VehicleModule } from './vehicle/vehicle.module'
import { StopModule } from './stop/stop.module'

const isDev = process.env.NODE_ENV === 'dev'

@Module({
    imports: [SubscriptionsModule.forRoot(), GraphQLModule, StopModule, VehicleModule],
    controllers: [AppController],
    components: [],
})
export class ApplicationModule implements NestModule {
    constructor(
        private readonly subscriptionsModule: SubscriptionsModule,
        private readonly graphQLFactory: GraphQLFactory
    ) {}

    configure(consumer: MiddlewaresConsumer) {
        const schema = this.createSchema()

        this.subscriptionsModule.createSubscriptionServer(schema)

        consumer
            .apply(
                expressPlayground({
                    endpoint: '/graphql',
                    subscriptionsEndpoint: process.env.SUBSCRIPTION_ENDPOINT,
                })
            )
            .forRoutes({ path: '/playground', method: RequestMethod.GET })
            .apply(
                graphiqlExpress({
                    endpointURL: '/graphql',
                    subscriptionsEndpoint: process.env.SUBSCRIPTION_ENDPOINT,
                })
            )
            .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
            .apply(
                graphqlExpress((req) => ({
                    schema,
                    // rootValue: { },
                    context: {
                        ...req,
                    },
                    tracing: isDev,
                }))
            )
            .forRoutes({ path: '/graphql', method: RequestMethod.ALL })
    }

    private createSchema() {
        const typeDefs = importSchema('./src/schema.graphql')

        const schema = this.graphQLFactory.createSchema({ typeDefs })
        return schema
    }
}
