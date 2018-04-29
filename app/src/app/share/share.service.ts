import { Injectable } from '@angular/core'
import { WindowRef } from '../windowRef/windowRef'

@Injectable()
export class ShareService {
    constructor(private winRef: WindowRef) {}

    get shareIntentSupported() {
        return !!this.winRef.nativeNavigator.share
    }

    intentShareUrl(url: string): Promise<any> {
        if (!this.shareIntentSupported) {
            throw new Error('Intent share not supported!')
        }
        return this.winRef.nativeNavigator.share({ url })
    }
}
