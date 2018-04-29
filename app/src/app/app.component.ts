import { Component, OnInit, HostListener } from '@angular/core'
import { SidenavService } from './sidenav/sidenav.service'
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular'
import { WindowRef } from './windowRef/windowRef'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    sidenavIsEnable = true
    sidenavIsOpen = false
    sidenavMode = 'over'

    isHorizontal = false

    constructor(
        private sidenavService: SidenavService,
        private router: Router,
        private apollo: Apollo,
        private winRef: WindowRef
    ) {}

    ngOnInit(): void {
        this.sidenavService.isOpen.distinctUntilChanged().subscribe((v) => {
            this.sidenavIsOpen = v
        })

        this.sidenavService.isEnable.distinctUntilChanged().subscribe((v) => {
            this.sidenavIsEnable = v
        })

        this.sidenavService.mode.distinctUntilChanged().subscribe((v) => {
            this.sidenavMode = v
        })

        this.sidenavService.resizeView(this.winRef.nativeWindow.innerWidth)
        this.checkIsHorizontal(this.winRef.nativeWindow.innerWidth, this.winRef.nativeWindow.innerHeight)
    }

    @HostListener('window:resize', ['$event'])
    onResize(event): void {
        this.sidenavService.resizeView(event.target.innerWidth)
        this.checkIsHorizontal(event.target.innerWidth, event.target.innerHeight)
    }
    checkIsHorizontal(width: number, height: number) {
        this.isHorizontal = width / height > 1.6
    }
    closeSideNav() {
        this.sidenavService.close()
    }

    sideNaveChanged(state) {
        if (state) {
            this.sidenavService.open()
        } else {
            this.sidenavService.close()
        }
    }

    goTo(url: string) {
        this.closeSideNav()
        this.router.navigate([url])
    }
}
