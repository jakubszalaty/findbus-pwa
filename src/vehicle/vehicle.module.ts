import { Module } from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { VehicleResolver } from './vehicle.resolver'

@Module({
    components: [VehicleService, VehicleResolver],
    exports: [],
})
export class VehicleModule {}
