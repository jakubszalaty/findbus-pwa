import { Pipe, PipeTransform } from '@angular/core'
import { Vehicle } from '../../schema-types'

@Pipe({ name: 'vehiclesFilter' })
export class VehiclesFilter implements PipeTransform {
    transform(vehicles: Vehicle[], searchText: any): any {
        if (searchText == null || !vehicles) {
            return vehicles
        }
        return vehicles.filter((stop) => {
            return (
                stop.line
                    .toLowerCase()
                    .trim()
                    .indexOf(searchText.toLowerCase().trim()) > -1
            )
        })
    }
}
