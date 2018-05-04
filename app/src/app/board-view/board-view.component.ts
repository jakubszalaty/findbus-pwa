import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { ActivatedRoute, Router } from '@angular/router'

import { Stop } from '../../schema-types'

import { Observable } from 'rxjs/Observable'
import { timer } from 'rxjs/observable/timer'
import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounce'
import { ApolloQueryResult } from 'apollo-client'
import { StopsWithDeparturesQueryResponse, STOPS_WITH_DEPARTURES_QUERY } from '../graphql'
import { Subscription } from 'rxjs/Subscription'
import { fadeInAnimation } from '../animations/fade-in.animation'
import { LatLngBoundsLiteral, GoogleMapsAPIWrapper, AgmInfoWindow } from '@agm/core'

import * as R from 'ramda'

@Component({
    selector: 'app-board-view',
    templateUrl: './board-view.component.html',
    styleUrls: ['./board-view.component.css'],
    animations: [fadeInAnimation],
    providers: [GoogleMapsAPIWrapper],
})
export class BoardViewComponent implements OnInit, OnDestroy {
    loading = true
    stopsList: Stop[]
    groupId$: Observable<number>
    subscriptions: Subscription[] = []

    lat = 53.4461311
    lng = 14.49227
    zoom = 16
    userLat = 53.4461311
    userLng = 14.49227

    @ViewChild('panelStates') panelStates: ElementRef

    constructor(
        private apollo: Apollo,
        private route: ActivatedRoute,
        private router: Router,
        private googleMapsAPIWrapper: GoogleMapsAPIWrapper
    ) {}

    ngOnInit() {
        // zamienic na observable
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         this.userLat = position.coords.latitude
        //         this.userLng = position.coords.longitude
        //     })
        // }

        this.groupId$ = this.route.paramMap.map((params) => {
            return Number(params.get('groupId'))
        })
        const getQuery = (variables): Observable<ApolloQueryResult<StopsWithDeparturesQueryResponse>> => {
            const query = this.apollo.watchQuery<StopsWithDeparturesQueryResponse>({
                query: STOPS_WITH_DEPARTURES_QUERY,
                variables,
            })
            // refetch co 30s
            query.startPolling(1000 * 30)
            return query.valueChanges
        }
        const stopsWithDeparturesQuery: Observable<
            ApolloQueryResult<StopsWithDeparturesQueryResponse>
        > = Observable.combineLatest(this.groupId$, (groupId) => ({
            where: { groupId },
        })).switchMap((variables: any) => getQuery(variables))

        const querySubscription = stopsWithDeparturesQuery.subscribe((response) => {
            this.loading = false
            this.stopsList = response.data.stopsWithDepartures
            this.findStopCenter()
        })

        this.subscriptions = [...this.subscriptions, querySubscription]
    }
    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            if (sub && sub.unsubscribe) {
                sub.unsubscribe()
            }
        }
    }

    findStopCenter() {
        const getCenter = (v, init) =>
            R.reduce((a, b) => [(Number(a[0]) + Number(b[0])) / 2, (Number(a[1]) + Number(b[1])) / 2], init)(
                v
            )
        const findCenterCords: any = R.pipe(
            R.map(R.props(['lnt', 'lat'])),
            R.converge(getCenter, [R.identity, R.head])
        )
        const centerCords = findCenterCords(this.stopsList)
        this.lng = centerCords[0]
        this.lat = centerCords[1]
    }
    getNumber(v: string) {
        return Number(v)
    }
    scroll(stopId, $infoWindow: AgmInfoWindow) {
        this.panelStates.nativeElement.querySelector(`#stop-card-${stopId}`).scrollIntoView()
        $infoWindow.close()
        // this.target.nativeElement.querySelector(`#stop-card-${stopId}`)
        // debugger
        // debugger
        // this.target.nativeElement.scrollIntoView()
        // el.scrollIntoView()
    }
}
