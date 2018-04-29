import * as R from 'ramda'
import fetch from 'node-fetch'
import { Component, Inject } from '@nestjs/common'
import { VehicleRaw } from '../typings/type'
import { VehicleWhereInput, Vehicle } from '../typings/schema'

@Component()
export class VehicleService {
    async getVehicles({ where }: { where: VehicleWhereInput }) {
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
        const convertId = R.converge(R.assoc, [R.always('id'), R.pipe(R.prop('id'), v => Number(v)), R.identity])
        const normalizeKeys = R.map(R.pipe(R.values, R.zipObj(keys), decodeTime, convertId))
        const whereEq = R.converge(R.eqProps, [R.keys, R.identity]) as any

        const filterKey = R.keys(where).length ? whereEq(where) : R.always(true)

        const vehicleRaw = (await fetch('https://www.zditm.szczecin.pl/json/pojazdy.inc.php').then(v =>
            v.json(),
        )) as VehicleRaw[]

        const resolveData = R.pipe<VehicleRaw[], Vehicle[], Vehicle[]>(normalizeKeys, R.filter(filterKey))

        return resolveData(vehicleRaw)
    }
    async getRouteCords(gmvid ) {
        return fetch(`https://www.zditm.szczecin.pl/json/trasy.inc.php?gmvid=${gmvid}`).then(v => v.json())
    }
}
