import { Gallery } from '../bean/gallery';
import { AngularFirestore } from '@angular/fire/firestore';
import { query } from '@angular/core/src/render3';

export class BaseComponent {
  public allGallery: Array<Gallery> = [];
  constructor(protected db: AngularFirestore) {
    this.db.collection('/galleries').valueChanges().subscribe(galleries => {
      galleries.forEach((gallery: Gallery) => {
        this.allGallery.push(gallery);
      });
    });
  }
}
