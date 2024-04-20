import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import videojs from 'video.js';

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.scss']
})
export class VideoDisplayComponent implements OnInit, OnDestroy {

  @ViewChild('playerRef', { static: true }) playerRef: ElementRef;

  options: {
    autoplay: boolean;
    controls: boolean;
    sources: {
      src: string;
      type: string;
    }[];
  };

  player: videojs.Player;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { src: string, mimetype: string }
  ) { }

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.options = {
      autoplay: true,
      controls: true,
      sources: [
        {
          src: this.data.src,
          type: 'video/mp4'
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this.player = videojs(this.playerRef.nativeElement, this.options, () => {
    });
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}