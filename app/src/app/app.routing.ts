import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BoardListComponent } from './board-list/board-list.component'
import { BoardViewComponent } from './board-view/board-view.component';

/**
 * Setup all routes here
 */
const routes: Routes = [
  {
    path: '',
    component: BoardListComponent,
    pathMatch: 'full',
  },
  {
    path: 'stop/:groupId',
    component: BoardViewComponent,
    pathMatch: 'full',
  },

  // {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: '/presentations/1',
  // },
  // {
  //     path: 'presentations/:page',
  //     component: PresentationListComponent,
  //     pathMatch: 'full',
  // },
  {
    path: '**',
    redirectTo: '',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
