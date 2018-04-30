import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'stopsFilter' })
export class StopsFilter implements PipeTransform {
  transform(stops: any, searchText: any): any {
    if (searchText == null || !stops ) {
      return stops
    }
    return stops.filter(stop => {
        return stop.name.toLowerCase().trim().indexOf(searchText.toLowerCase().trim()) > -1
    })
  }
}
