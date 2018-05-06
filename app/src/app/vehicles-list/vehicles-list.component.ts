import * as R from 'ramda'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { HeaderService } from '../header/header.service'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Apollo } from 'apollo-angular'
import { Vehicle } from '../../schema-types'
import { VehiclesQueryResponse, VEHICLES_QUERY } from '../graphql'
import { fadeInAnimation } from '../animations/fade-in.animation'
import { timer } from 'rxjs/observable/timer'
import { Subscription } from 'rxjs/Subscription'

@Component({
    selector: 'app-vehicles-list',
    templateUrl: './vehicles-list.component.html',
    styleUrls: ['./vehicles-list.component.css'],
    animations: [fadeInAnimation],
})
export class VehiclesListComponent implements OnInit, OnDestroy {
    loading = true
    vehiclesList: Vehicle[]

    searchForm: FormGroup
    listFilter: string
    viewPortItems: Vehicle[]
    subscriptions: Subscription[] = []

    lat = 53.4461311
    lng = 14.49227
    zoom = 16

    constructor(private apollo: Apollo, fb: FormBuilder, private headerService: HeaderService) {
        this.searchForm = fb.group({
            searchText: '',
        })
    }

    ngOnInit() {
        this.headerService.setMenuMode()
        this.headerService.setMenuTitle('Find bus - list of vehicles')

        const vehiclesQuery = this.apollo.watchQuery<VehiclesQueryResponse>({
            query: VEHICLES_QUERY,
        }).valueChanges

        const querySubscription = vehiclesQuery.subscribe((response) => {
            this.loading = false
            this.vehiclesList = R.pipe(
                R.uniqBy(R.prop('line')),
                R.sortBy(R.pipe(R.prop('line'), (v) => Number(v) || Infinity))
            )(response.data.vehicles)
        })

        this.subscriptions = [...this.subscriptions, querySubscription]

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
}
