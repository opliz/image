import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../component/home/home.component';
import { AboutComponent } from '../component/about/about.component';
import { ContactComponent } from '../component/contact/contact.component';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { ImageComponent } from '../component/image/image.component';
import { GalleryComponent } from '../component/gallery/gallery.component';
import { VideoComponent } from '../component/video/video.component';

const appRoute: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'photo/:photoId', component: ImageComponent },
            { path: 'gallery/:type', component: GalleryComponent },
            { path: 'video', component: VideoComponent},
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
            { path: '**', component: PageNotFoundComponent }
        ]
    },

];


export const routing: ModuleWithProviders = RouterModule.forChild(appRoute);
