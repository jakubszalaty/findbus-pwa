import * as R from 'ramda'
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core'
import { Apollo } from 'apollo-angular'

import { FormBuilder, FormGroup } from '@angular/forms'
import { STOPS_QUERY, StopsQueryResponse } from '../graphql'
import { ApolloQueryResult } from 'apollo-client'

import { Stop } from '../../schema-types'
import { Observable } from 'rxjs/Observable'
import { timer } from 'rxjs/observable/timer'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounce'
import { fadeInAnimation } from '../animations/fade-in.animation'
import { HeaderService } from '../header/header.service'
import { Subscription } from 'apollo-client/util/Observable'
import { LocalStorage } from '@ngx-pwa/local-storage'
import { Router } from '@angular/router'

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.css'],
    animations: [fadeInAnimation],
})
export class BoardListComponent implements OnInit, OnDestroy {
    loading = true
    stopsList: Stop[]
    recentlyUsed: Stop[]
    searchForm: FormGroup
    listFilter: string
    viewPortItems: Stop[]
    subscriptions: Subscription[] = []
    recentlyUsedIds: number[]

    constructor(
        fb: FormBuilder,
        private apollo: Apollo,
        private headerService: HeaderService,
        private localStorage: LocalStorage,
        private router: Router
    ) {
        this.searchForm = fb.group({
            searchText: '',
        })
    }

    ngOnInit() {
        this.headerService.setMenuMode()
        this.headerService.setMenuTitle('Find bus - list of boards')

        const stopsQuery = this.apollo.watchQuery<StopsQueryResponse>({
            query: STOPS_QUERY,
        }).valueChanges

        const querySubscription = stopsQuery.subscribe((response) => {
            this.loading = false
            this.stopsList = R.pipe(R.uniqBy(R.prop('name')), R.sortBy(R.prop('name')))(response.data.stops)

            this.localStorage.getItem<number[]>('recentlyUsedIds').subscribe((recentlyUsedIds) => {
                if (!recentlyUsedIds) {
                    return
                }
                this.recentlyUsedIds = recentlyUsedIds
                this.recentlyUsed = this.getLastSelectedStops(this.stopsList)(recentlyUsedIds)
            })
        })

        const searchSubscription = this.searchForm.valueChanges
            .distinctUntilChanged()
            .debounce(() => timer(100))
            .subscribe((data) => {
                this.listFilter = R.has('searchText', data) ? data.searchText : this.listFilter
            })

        this.subscriptions = [...this.subscriptions, querySubscription, searchSubscription]
    }
    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            if (sub && sub.unsubscribe) {
                sub.unsubscribe()
            }
        }
    }

    clearSearchText() {
        this.searchForm.setValue({ searchText: '' })
        this.listFilter = ''
    }

    getLastSelectedStops(stopsList) {
        return R.map((v) => R.find(R.propEq('groupId', v), stopsList))
    }
    goToStop(stop: Stop) {
        const recentlyUsedIds = R.pipe(R.prepend(stop.groupId), R.uniq, R.take(5))(this.recentlyUsedIds)

        this.localStorage.setItem('recentlyUsedIds', recentlyUsedIds).subscribe(() => {
            this.router.navigate(['/', 'stop', stop.groupId])
        })
    }
}
