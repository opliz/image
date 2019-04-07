import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Gallery } from 'src/app/bean/gallery';
import { Observable } from 'rxjs';

@Injectable()
export class GalleryService extends BaseService {

  constructor(private db: AngularFirestore) {
    super();
  }

  getGalleriesByType(type: string) {
    return this.db.collection('/galleries', ref => ref.where('type', '==', type)
      .where('enable', '==', true)).valueChanges() as Observable<Array<Gallery>>;
  }

}
