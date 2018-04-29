import { Resolver, ResolveProperty, Query } from '@nestjs/graphql'
import * as R from 'ramda'
import { StopService } from './stop.service'

@Resolver('Stop')
export class StopResolver {
    constructor(private stopService: StopService) {}
    @Query('stops')
    async getStops(root, args, ctx, info) {
        return this.stopService.getStops(args)
    }

    @Query('stop')
    async getStop(root, args, ctx, info) {
        const stops = await this.stopService.getStops(args)
        return R.head(stops)
    }
}
