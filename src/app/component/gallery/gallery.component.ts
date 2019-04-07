import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/bean/image';
import { PhotoSwipeComponent } from '../photo-swipe/photo-swipe.component';
import { NgxMasonryOptions } from '../../ngx-masonry/ngx-masonry-options';
import { Title } from '@angular/platform-browser';
import { Constant } from 'src/app/constant/constant';
import { PhotoService } from 'src/app/service/flickr/photo.service';
import { Gallery } from 'src/app/bean/gallery';
import { GalleryService } from 'src/app/service/firebase/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [PhotoService, GalleryService]
})
export class GalleryComponent implements OnInit {

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
  type: string;

  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 0,
    resize: true,
    initLayout: true,
    fitWidth: true,
  };

  constructor(private title: Title, private router: Router, private activateRouter: ActivatedRoute, private photoService: PhotoService,
    private galleryService: GalleryService) {
    this.activateRouter.params.subscribe(params => {
      this.type = params['type'];
    });
  }

  ngOnInit() {
    this.getPhotos();
  }

  private getPhotos() {
    this.galleryService.getGalleriesByType(this.type).subscribe(galleries => {
      // load photos
      this.getPhotosByGalleryId(galleries[this.galleryIndex].id);
      const title = 'odxpo - Ảnh Đẹp Mỗi Ngày - ' + galleries[this.galleryIndex].name;
      this.title.setTitle(title);
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
