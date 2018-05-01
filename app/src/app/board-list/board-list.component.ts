import { Component, OnInit, OnDestroy } from '@angular/core'
import { Apollo } from 'apollo-angular'

import { FormBuilder, FormGroup } from '@angular/forms'
import { STOPS_QUERY, StopsQueryResponse } from '../graphql'
import { ApolloQueryResult } from 'apollo-client'

import { Stop } from '../../schema-types'

import { uniqBy, prop, has } from 'ramda'

import { Observable } from 'rxjs/Observable'
import { timer } from 'rxjs/observable/timer'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounce'

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.css'],
})
export class BoardListComponent implements OnInit {
    loading = true
    searchForm: FormGroup
    stopsList: Stop[]
    listFilter: string
    viewPortItems: Stop[]

    constructor(private apollo: Apollo, fb: FormBuilder) {
        this.searchForm = fb.group({
            searchText: '',
        })
    }

    ngOnInit() {
        const stopsQuery = this.apollo.watchQuery<StopsQueryResponse>({
            query: STOPS_QUERY,
        }).valueChanges

        stopsQuery.subscribe((response) => {
            // this.stopsList = response.data.stops
            this.stopsList = uniqBy(prop('name'), response.data.stops)
            this.loading = false
        })

        this.searchForm.valueChanges
            .distinctUntilChanged()
            .debounce(() => timer(100))
            .subscribe((data) => {
                this.listFilter = has('searchText', data) ? data.searchText : this.listFilter
            })
    }

    clearSearchText() {
        this.searchForm.setValue({ searchText: '' })
        this.listFilter = ''
    }
}
