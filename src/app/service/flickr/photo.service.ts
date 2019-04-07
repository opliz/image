import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PhotoService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getPhotosByPhotoSetId(photoSetId, perPage, page) {
    const url = Constant.BASE_URL
      + '&method=flickr.photosets.getPhotos'
      + '&photoset_id=' + photoSetId
      + '&user_id=' + environment.user_id
      + '&extras=date_upload,url_o,url_m'
      + '&per_page=' + perPage
      + '&page=' + page;
    return this.httpClient.get(url) as Observable<any>;
  }

  getPhotoSizesByPhotoId(photoId) {
    const url = Constant.BASE_URL
      + '&method=flickr.photos.getSizes'
      + '&photo_id=' + photoId;
      return this.httpClient.get(url) as Observable<any>;
  }

  getPhotoByPhotoId(photoId) {
    const url = Constant.BASE_URL
      + '&method=flickr.photos.getInfo'
      + '&photo_id=' + photoId;
      return this.httpClient.get(url) as Observable<any>;
  }

  getPhotosByGalleryId(galleryId, perPage, page) {
    const url = Constant.BASE_URL
      + '&method=flickr.galleries.getPhotos'
      + '&gallery_id=' + galleryId
      + '&extras=url_m,url_o'
      + '&per_page=' + perPage
      + '&page=' + page;
    return this.httpClient.get(url) as Observable<any>;
  }

}
