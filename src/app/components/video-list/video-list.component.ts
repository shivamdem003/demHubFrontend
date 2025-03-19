import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-list',
  standalone: false,
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent implements OnInit{
  videos: string[] = [];
  selectedVideoUrl: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<string[]>('http://localhost:9090/videos').subscribe(data => {
      this.videos = data;
    });
  }

  playVideo(video: string) {
    this.selectedVideoUrl = `http://localhost:9090/videos/${encodeURIComponent(video)}`;
  }

}
