import { Resolver, Query } from '@nestjs/graphql'

import fetch from 'node-fetch'
import * as R from 'ramda'
import { VehicleRaw } from '../typings/type'
import { VehicleWhereInput, Vehicle } from '../typings/schema'

@Resolver('Zditm')
export class ZditmResolver {
    @Query()
    async vehicles(root, { where }: { where: VehicleWhereInput }, ctx, info) {
        // const stops = await fetch('http://www.zditm.szczecin.pl/json/slupki.inc.php').then(v => v.json())
        const keys = [
            'gmvid', // gmvid
            'id', // id
            'line', // linia
            'squad', // brygada
            'lineType', // typlinii
            'vehicleId', // pojazd
            'route', // trasa
            'from', // z
            'to', // do
            'lat', // lat
            'lnt', // lon
            'speed', // predkosc
            'timeString', // punktualnosc1
            'timeNumber', // punktualnosc2
            'icon', // ikonka
        ]
        const decodeTime = R.converge(R.assoc, [
            R.always('timeNumber'),
            R.pipe(R.prop('timeNumber'), R.replace('&minus;', '-'), v => Number(v)),
            R.identity,
        ])
        const normalizeKeys = R.map(R.pipe(R.values, R.zipObj(keys), decodeTime))
        const whereEq = R.converge(R.eqProps, [R.keys, R.identity]) as any

        const filterKey = R.keys(where).length ? whereEq(where) : R.always(true)

        const vehicleRaw = (await fetch('http://www.zditm.szczecin.pl/json/pojazdy.inc.php').then(v =>
            v.json(),
        )) as VehicleRaw[]

        const resolveData = R.pipe<VehicleRaw[], Vehicle[], Vehicle[]>(normalizeKeys, R.filter(filterKey))

        return resolveData(vehicleRaw)
    }
}
