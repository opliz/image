import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
// import { NgxMasonryModule } from 'ngx-masonry';
import { NgxMasonryModule } from './ngx-masonry/ngx-masonry.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { LayoutModule } from './layout/layout.module';
import { appRoutes } from './routing';
import { environment } from 'src/environments/environment';
import { PhotoService } from './service/flickr/photo.service';
import { GalleryService } from './service/firebase/gallery.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    RouterModule.forRoot(
      appRoutes
    ),
    SlimLoadingBarModule.forRoot(),
    NgxMasonryModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule
  ],
  exports: [SlimLoadingBarModule],
  providers: [
    PhotoService,
    GalleryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
