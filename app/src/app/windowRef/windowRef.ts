import { Injectable } from '@angular/core'

function _window(): any {
    // return the global native browser window object
    return window
}

function _navigator(): any {
    // return the global native browser window object
    return window.navigator
}
// from https://juristr.com/blog/2016/09/ng2-get-window-ref/
@Injectable()
export class WindowRef {
    get nativeWindow(): any {
        return _window()
    }
    get nativeNavigator(): any {
        return _navigator()
    }
}
