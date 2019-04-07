import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './component/home/home.component';

export const appRoutes: Routes = [
  { path: '**', component: LayoutComponent, loadChildren: './layout/layout.module#LayoutModule' },
];
