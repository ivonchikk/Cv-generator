import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { BreadCrumb } from './breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
 public breadcrumbs: BreadCrumb[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;
  }

}