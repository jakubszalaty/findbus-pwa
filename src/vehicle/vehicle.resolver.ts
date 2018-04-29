import { Resolver, ResolveProperty, Query } from '@nestjs/graphql'

import fetch from 'node-fetch'
import * as R from 'ramda'
import { VehicleRaw } from '../typings/type'
import { VehicleWhereInput, Vehicle } from '../typings/schema'
import { VehicleService } from './vehicle.service'

@Resolver('Vehicle')
export class VehicleResolver {
    constructor(private vehicleService: VehicleService) {}
    @Query('vehicles')
    async getVehicles(root, args, ctx, info) {
        return this.vehicleService.getVehicles(args)
    }

    @Query('vehicle')
    async getVehicle(root, args, ctx, info) {
        const vehicles = await this.vehicleService.getVehicles(args)
        return R.head(vehicles)
    }

    @ResolveProperty('routeCords')
    async getRouteCords({ gmvid }) {
        this.vehicleService.getRouteCords(gmvid)
    }

    // @ResolveProperty('fromDetails')
    // async getFromDetails({ from, nr }) {
    //     // TODO: Create and move to VehicleService
    //     return fetch(`https://www.zditm.szczecin.pl/json/trasy.inc.php?gmvid=1`).then(v => v.json())
    // }
}
