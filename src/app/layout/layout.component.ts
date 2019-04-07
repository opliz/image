import { Component, OnInit } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.startLoading();
    this.completeLoading();
  }

  startLoading() {
    this.slimLoadingBarService.start(() => {
    });
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }

}
