import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxMasonryOptions } from '../../ngx-masonry/ngx-masonry-options';
import { PhotoSwipeComponent } from '../photo-swipe/photo-swipe.component';
import { Image } from '../../bean/image';
import { Constant } from 'src/app/constant/constant';
import { Gallery } from 'src/app/bean/gallery';
import { PhotoService } from 'src/app/service/flickr/photo.service';
import { GalleryService } from 'src/app/service/firebase/gallery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PhotoService, GalleryService]
})
export class HomeComponent implements OnInit {

  @ViewChild('photoSwipe') photoSwipe: PhotoSwipeComponent;
  images: Array<Image> = [];
  stack: Array<Image> = [];
  total;
  page = 1;
  pages;
  count = 0;
  galleries: Array<Gallery> = [];
  galleryIndex = 0;
  loadMore = true;

  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 0,
    resize: false,
    initLayout: true,
    fitWidth: true
  };

  constructor(private meta: Meta, private title: Title,
    private photoService: PhotoService, private galleryService: GalleryService) {
      this.meta.addTags([
        {name: 'keywords', content: 'odxpo, media, flickr, image, photo, ảnh đẹp mỗi ngày, liên minh huyền thoại, anime, hài vl'},
        {name: 'description', content: 'website xem ảnh online với nhiều chủ đề hấp dẫn được sưu tập từ internet.'},
        {name: 'author', content: 'http://www.odxpo.com'},
        {name: 'application-name', content: 'odxpo-media'},
      ]);
    }

  ngOnInit() {
    this.title.setTitle('odxpo - Ảnh Đẹp Mỗi Ngày - Home');
    this.getPhotos();
  }

  private getPhotos() {
    this.galleryService.getGalleriesByType(Constant.HOME_TYPE).subscribe(galleries => {
      // load photos
      this.getPhotosByGalleryId(galleries[this.galleryIndex].id);
      this.galleries = galleries;
    });
  }

  openGallery(index) {
    this.photoSwipe.generalOpenGallery(this.images, index);
  }

  // get photos
  private getPhotosByGalleryId(galleryId) {
    this.photoService.getPhotosByGalleryId(galleryId, Constant.GENERAL_PER_PAGE, this.page).subscribe(data => {
      if (data) {
        this.pages = data.photos.pages;
        this.total = data.photos.total;
        data.photos.photo.forEach(element => {
          const image = new Image();
          // image.pid = element.id;
          image.id = element.id;
          image.title = '<a href=\"photo/' + element.id + '\">' + element.title + '</a>';
          image.title_o = element.title;
          image.src_m = element.url_m;
          image.src = element.url_o;
          image.w = element.width_o;
          image.h = element.height_o;
          this.stack.push(image);
        });
        this.page++;
        this.count += 25;
        this.images = this.stack.slice(0, this.count);
        this.galleryIndex++;
      } else {
        this.loadMore = false;
      }
    });
  }

  showMoreImages() {
    if (this.count < this.stack.length) {
      this.count += 25;
      this.images = this.stack.slice(0, this.count);
    } else {
      // load from another gallery
      this.page = 1;
      if (this.galleryIndex < this.galleries.length) {
        this.getPhotosByGalleryId(this.galleries[this.galleryIndex].id);
      } else {
        this.loadMore = false;
      }
    }
  }

  layoutComplete(event: EventEmitter<any>) {
    if (this.galleryIndex < this.galleries.length) {
      if (this.count < this.stack.length) {
        if (this.count % 50 !== 0) {
          this.count += 25;
          this.images = this.stack.slice(0, this.count);
        }
      } else {
        this.loadMore = false;
      }
    }
  }

}
