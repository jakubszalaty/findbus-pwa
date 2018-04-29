import { Module } from '@nestjs/common'
import { StopService } from './stop.service'
import { StopResolver } from './stop.resolver'
import { StopWithDeparturesResolver } from './stopWithDepartures.resolver'

@Module({
    components: [StopService, StopResolver, StopWithDeparturesResolver],
    exports: [],
})
export class StopModule {}
