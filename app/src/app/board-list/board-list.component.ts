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

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.css'],
    animations: [fadeInAnimation],
})
export class BoardListComponent implements OnInit {
    loading = true
    searchForm: FormGroup
    stopsList: Stop[]
    listFilter: string
    viewPortItems: Stop[]

    constructor(private apollo: Apollo, fb: FormBuilder, private headerService: HeaderService) {
        this.searchForm = fb.group({
            searchText: '',
        })
    }

    ngOnInit() {
        this.headerService.setMenuMode()
        this.headerService.setMenuTitle('Find bus - boards list')

        const stopsQuery = this.apollo.watchQuery<StopsQueryResponse>({
            query: STOPS_QUERY,
        }).valueChanges

        stopsQuery.subscribe((response) => {
            // this.stopsList = response.data.stops
            this.loading = false

            this.stopsList = R.pipe(R.uniqBy(R.prop('name')), R.sortBy(R.prop('name')))(response.data.stops)
        })

        this.searchForm.valueChanges
            .distinctUntilChanged()
            .debounce(() => timer(100))
            .subscribe((data) => {
                this.listFilter = R.has('searchText', data) ? data.searchText : this.listFilter
            })
    }

    clearSearchText() {
        this.searchForm.setValue({ searchText: '' })
        this.listFilter = ''
    }
}
