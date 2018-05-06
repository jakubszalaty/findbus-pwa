import { Pipe, PipeTransform } from '@angular/core'
import { Vehicle } from '../../schema-types'

@Pipe({ name: 'vehiclesFilter' })
export class VehiclesFilter implements PipeTransform {
    transform(vehicles: Vehicle[], line: string): any {
        if (line === null || line === 'all' || !vehicles) {
            return vehicles
        }
        return vehicles.filter((vehicle) => vehicle.line === line)
    }
}
