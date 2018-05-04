import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class HeaderService {
    private _iconStatus = new BehaviorSubject('menu')
    private _routeUrl = new BehaviorSubject(['/'])
    private _menuTitle = new BehaviorSubject('Find bus - boards list')

    get iconStatus(): Observable<string> {
        return this._iconStatus.asObservable()
    }

    get routeUrl(): Observable<string[]> {
        return this._routeUrl.asObservable()
    }
    get menuTitle(): Observable<string> {
        return this._menuTitle.asObservable()
    }

    setArrowBackMode(routeUrl: string[]) {
        this._iconStatus.next('back')
        this._routeUrl.next(routeUrl)
    }

    setMenuMode() {
        this._iconStatus.next('menu')
        this._routeUrl.next(['/'])
    }

    setMenuTitle(title: string) {
        this._menuTitle.next(title)
    }
}
