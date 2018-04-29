import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
} from '@angular/material'

import { AppComponent } from './app.component'

import { GraphQLModule } from './apollo.config'

import { HeaderComponent } from './header/header.component'

import { AppRoutingModule } from './app.routing'

import { OrderByPipe } from './pipes/order-by.pipe'

import { SidenavService } from './sidenav/sidenav.service'


import { ClipboardModule } from 'ngx-clipboard'
import { WindowRef } from './windowRef/windowRef'
import { ShareService } from './share/share.service'
import { BoardListComponent } from './board-list/board-list.component';

@NgModule({
    declarations: [
        AppComponent,
        BoardListComponent,
        HeaderComponent,
        OrderByPipe,
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        AppRoutingModule,
        // connection
        GraphQLModule,
        // MaterialDesign
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
        ClipboardModule,
    ],
    providers: [
        SidenavService,
        WindowRef,
        ShareService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
