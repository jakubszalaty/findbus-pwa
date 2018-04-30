import { Component, OnInit, OnDestroy } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { ActivatedRoute, Router } from '@angular/router'

import { MatSnackBar } from '@angular/material'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
})
export class BoardListComponent implements OnInit {
  loading = true
  searchForm: FormGroup
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder
  ) {
    this.searchForm = fb.group({
      searchText: '',
    })
  }

  ngOnInit() {
    this.loading = false
  }

  clearSearchText() {
    this.searchForm.setValue({ searchText: '' })
  }
}
