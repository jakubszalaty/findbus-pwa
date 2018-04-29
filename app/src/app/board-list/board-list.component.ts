import { Component, OnInit, OnDestroy } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { ActivatedRoute, Router } from '@angular/router'

import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
})
export class BoardListComponent implements OnInit {
  loading = true

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.loading = false
  }
}
