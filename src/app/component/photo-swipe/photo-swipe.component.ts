import { Component, ViewChild, ElementRef, Input } from '@angular/core';

// Import PhotoSwipe
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

// Image Interface
import { Image } from '../../bean/image';

@Component({
    selector   : 'app-photo-swipe',
    templateUrl: './photo-swipe.component.html',
    styleUrls  : ['./photo-swipe.component.css']
})
export class PhotoSwipeComponent {
    @ViewChild('photoSwipe') photoSwipe: ElementRef;

    @Input() images: Image[] = [];

    // ========================================================================
    constructor() { }

    // ========================================================================
    generalOpenGallery(images?: Image[], index?: number) {
        // Build gallery images array
        images = images || this.images;
        index = index || 0;

        // define options (if needed)
        const options = {
            // optionName: 'option value'
            // for example:
            index: index, // start at first slide
            // escKey: false,
            closeOnScroll: false,
            closeOnVerticalDrag: false,
            // pinchToClose: false,
            clickToCloseNonZoomable: false,
            tapToClose: false,
            // history: true,
            // galleryPIDs: true,
        };

        // Initializes and opens PhotoSwipe
        const gallery = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, images, options);
        gallery.init();
    }
    // ========================================================================
    singleOpenGallery(images?: Image[], index?: number) {
        // Build gallery images array
        images = images || this.images;
        index = index || 0;

        // define options (if needed)
        const options = {
            // optionName: 'option value'
            // for example:
            index: index, // start at first slide
            // escKey: false,
            closeOnScroll: true,
            closeOnVerticalDrag: false,
            // pinchToClose: false,
            clickToCloseNonZoomable: false,
            tapToClose: false,
            // history: true,
            // galleryPIDs: true,
        };

        // Initializes and opens PhotoSwipe
        const gallery = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, images, options);
        gallery.init();
    }
}
