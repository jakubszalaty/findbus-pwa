import { Component, OnInit, OnDestroy } from '@angular/core'
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

@Component({
    selector: 'app-board-view',
    templateUrl: './board-view.component.html',
    styleUrls: ['./board-view.component.css'],
})
export class BoardViewComponent implements OnInit, OnDestroy {
    loading = true
    stopsList: Stop[]
    groupId$: Observable<number>
    subscriptions: Subscription[] = []

    constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
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
            this.stopsList = response.data.stopsWithDepartures
            this.loading = false
            console.log(this.stopsList)
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
}
