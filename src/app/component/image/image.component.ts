import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoSwipeComponent } from '../photo-swipe/photo-swipe.component';
import { Image } from 'src/app/bean/image';
import { PhotoService } from 'src/app/service/flickr/photo.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  providers: [PhotoService]
})
export class ImageComponent implements OnInit {

  photoId: string;
  @ViewChild('photoSwipe') photoSwipe: PhotoSwipeComponent;
  image: Image;

  constructor(private meta: Meta, private title: Title, private router: Router, private activateRouter: ActivatedRoute,
    private photoService: PhotoService) {
    this.activateRouter.params.subscribe(params => {
      this.photoId = params['photoId'];
    });
  }

  ngOnInit() {
    this.getPhoto();
  }

  getPhoto() {
    this.photoService.getPhotoByPhotoId(this.photoId).subscribe(data => {
      const image = new Image();
      const title = 'odxpo - Ảnh Đẹp Mỗi Ngày - ' + data.photo.title._content;
      const imageTitle = data.photo.title._content;
      this.title.setTitle(title);
      image.id = data.photo.id;
      image.title_o = data.photo.title._content;
      const src = 'https://farm' + data.photo.farm + '.staticflickr.com/'
        + data.photo.server + '/' + data.photo.id + '_' + data.photo.originalsecret + '_o.' + data.photo.originalformat;
      const src_m = 'https://farm' + data.photo.farm + '.staticflickr.com/'
        + data.photo.server + '/' + data.photo.id + '_' + data.photo.secret + '_c.' + data.photo.originalformat;
      image.src = src;
      image.src_m = src_m;

      this.meta.addTags([
        {name: 'keywords',
        content: 'odxpo, media, flickr, image, photo, ảnh đẹp mỗi ngày, liên minh huyền thoại, anime, hài vl, ' + imageTitle},
        {name: 'description', content: 'Website xem ảnh online với nhiều chủ đề hấp dẫn được sưu tập từ internet.'},
        {name: 'author', content: 'http://www.odxpo.com'},
        {name: 'application-name', content: 'odxpo-media'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@opliz_8x'},
        {name: 'twitter:title', content: imageTitle},
        {name: 'twitter:description', content: 'Website xem ảnh online với nhiều chủ đề hấp dẫn được sưu tập từ internet.'},
        {name: 'twitter:image', content: src_m},
        {name: 'og:title', content: imageTitle},
        {name: 'og:type', content: 'article'},
        {name: 'og:description', content: 'Website xem ảnh online với nhiều chủ đề hấp dẫn được sưu tập từ internet.'},
        {name: 'og:image', content: src_m}
      ]);
      this.image = image;
    });
  }
}
