import { Pipe, PipeTransform } from '@angular/core'
import { Stop } from '../../schema-types'

@Pipe({ name: 'stopsFilter' })
export class StopsFilter implements PipeTransform {
    transform(stops: Stop[], searchText: any): any {
        if (searchText == null || !stops) {
            return stops
        }
        return stops.filter((stop) => {
            return (
                stop.name
                    .toLowerCase()
                    .trim()
                    .indexOf(searchText.toLowerCase().trim()) > -1
            )
        })
    }
}
