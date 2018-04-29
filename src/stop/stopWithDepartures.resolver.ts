import { Resolver, ResolveProperty, Query } from '@nestjs/graphql'
import * as R from 'ramda'
import { StopService } from './stop.service'

@Resolver('StopWithDepartures')
export class StopWithDeparturesResolver {
    constructor(private stopService: StopService) {}
    @Query('stopsWithDepartures')
    async getStopsWithDepartures(root, args, ctx, info) {
        return this.stopService.getStops(args)
    }

    @ResolveProperty('departures')
    async getDepartures({ groupId, columnId }) {
        return this.stopService.getDepartures(groupId, columnId)
    }
}
