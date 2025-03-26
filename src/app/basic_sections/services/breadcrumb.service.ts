import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadCrumb } from '../breadcrumb/breadcrumb.interface';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService implements OnInit {
    public breadcrumbs: BreadCrumb[] = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

    public ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root));
    }

    private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url: url });
            return this.createBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }
}