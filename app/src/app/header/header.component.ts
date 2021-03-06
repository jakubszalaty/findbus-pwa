import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { Location } from '@angular/common'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/filter'
import { Subject } from 'rxjs/Subject'
import { SidenavService } from '../sidenav/sidenav.service'
import { HeaderService } from './header.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    showBack = false
    isMenuButtonVisible = true
    iconStatus: string
    routeUrl: string[]
    menuTitle: string
    constructor(
        private sidenavService: SidenavService,
        private headerService: HeaderService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        this.sidenavService.isMenuButtonVisible.distinctUntilChanged().subscribe((v) => {
            this.isMenuButtonVisible = v
        })
        this.headerService.iconStatus.distinctUntilChanged().subscribe((v) => {
            this.iconStatus = v
        })
        this.headerService.routeUrl.distinctUntilChanged().subscribe((v) => {
            this.routeUrl = v
        })
        this.headerService.menuTitle.distinctUntilChanged().subscribe((v) => {
            this.menuTitle = v
        })
    }

    goBack() {
        // this.location.back()
        this.router.navigate(['/'])
    }
    openSidenav() {
        this.sidenavService.open()
    }
}
