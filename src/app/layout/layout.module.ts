import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../component/home/home.component';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { AboutComponent } from '../component/about/about.component';
import { ContactComponent } from '../component/contact/contact.component';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { SidebarComponent } from './sidebar.component';
import { routing } from './routing';
import { PhotoSwipeComponent } from '../component/photo-swipe/photo-swipe.component';
import { ImageComponent } from '../component/image/image.component';
import { GalleryComponent } from '../component/gallery/gallery.component';
import { VideoComponent } from '../component/video/video.component';
import { NgxMasonryModule } from '../ngx-masonry/ngx-masonry.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    routing,
    SlimLoadingBarModule.forRoot(),
    NgxMasonryModule
  ],
  declarations: [
    LayoutComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    PhotoSwipeComponent,
    ImageComponent,
    GalleryComponent,
    VideoComponent
  ]
})
export class LayoutModule { }
