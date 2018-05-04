import * as R from 'ramda'
import fetch from 'node-fetch'
import * as fs from 'fs-extra'
import { Component, Inject } from '@nestjs/common'
import { JSDOM } from 'jsdom'
import { StopRaw } from '../typings/type'
import { StopWhereInput, Stop } from '../typings/schema'

@Component()
export class StopService {
    async getStops({ where }: { where: StopWhereInput }) {
        const keys = [
            'id', // id
            'lat', // szerokoscgeo
            'lnt', // dlugoscgeo
            'name', // nazwa
            'groupId', // nrzespolu
            'columnId', // nrslupka
        ]

        const convertId = R.converge(R.assoc, [
            R.always('columnId'),
            R.pipe(R.prop('columnId'), (v) => Number(v)),
            R.identity,
        ])
        const normalizeKeys = R.map(R.pipe(R.values, R.zipObj(keys), convertId))
        const whereEq = R.converge(R.eqProps, [R.keys, R.identity]) as any

        const filterKey = R.keys(where).length ? whereEq(where) : R.always(true)

        // const stopRaw = (await fetch('https://www.zditm.szczecin.pl/json/slupki.inc.php').then((v) =>
        //     v.json()
        // )) as StopRaw[]

        const stopRaw = (await fs.readJSON('./misc/stops.json')) as StopRaw[]

        const resolveData = R.pipe<StopRaw[], Stop[], Stop[]>(normalizeKeys, R.filter(filterKey))

        return resolveData(stopRaw)
    }

    async getDepartures(groupId, columnId) {
        try {
            const html = await fetch(
                `https://www.zditm.szczecin.pl/json/tablica.inc.php?slupek=${groupId}${columnId}`
            ).then((v) => v.text())
            const dom = new JSDOM(html) as any
            const isError = !!dom.window.document.querySelector('tbody tr td.gmvblad')
            if (isError) {
                return null
            }

            const parseReciveData = R.map(
                R.pipe(
                    (v: any) => ({
                        line: v.children[0].textContent,
                        direction: v.children[1].textContent,
                        arrival: v.children[2].textContent,
                    }),
                    R.converge(R.merge, [
                        R.identity,
                        R.pipe(R.prop('arrival'), (v) => {
                            const onStop = !!v.match('>>>')
                            const isApprox = !!v.match('za')
                            return {
                                arrival: v.replace('za', '').trim(),
                                onStop,
                                isApprox,
                            }
                        }),
                    ])
                )
            )
            return parseReciveData([...dom.window.document.querySelectorAll('tbody tr')])
        } catch (error) {
            return error
        }
    }
}
