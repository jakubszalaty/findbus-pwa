import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class SidenavService {
    private _open = new BehaviorSubject(false)
    private _menuButtonShow = new BehaviorSubject(true)
    private _mode = new BehaviorSubject('over')
    private _isDesktop = false
    private _enable = new BehaviorSubject(true)

    constructor() {}
    get isOpen(): Observable<boolean> {
        return this._open.asObservable()
    }

    get isEnable(): Observable<boolean> {
        return this._enable.asObservable()
    }

    get mode(): Observable<string> {
        return this._mode.asObservable()
    }

    get isMenuButtonVisible(): Observable<boolean> {
        return this._menuButtonShow.asObservable()
    }
    open() {
        this._open.next(true)
    }
    close() {
        if (!this._isDesktop) {
            this._open.next(false)
        }
    }
    toggle() {
        this._open.next(!this._open.value)
    }
    enable() {
        this._enable.next(true)
    }
    disable() {
        this._enable.next(false)
    }
    resizeView(width: number): void {
        this._isDesktop = width >= 1024
        this._mode.next(this._isDesktop ? 'side' : 'over')
        this._open.next(this._isDesktop)
        this._menuButtonShow.next(!this._isDesktop)
    }
}
