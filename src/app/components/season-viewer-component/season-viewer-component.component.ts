import { Component, OnInit } from '@angular/core';
import { FileNode } from '../../model/file-node.model';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-season-viewer-component',
  standalone: false,
  templateUrl: './season-viewer-component.component.html',
  styleUrl: './season-viewer-component.component.css'
})
export class SeasonViewerComponentComponent implements OnInit{

  showName: string = '';
  seasons: FileNode[] = [];
  selectedVideoUrl: string | null = null;
  selectedVideoName: string | null = null;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit() {
    const encodedPath = this.route.snapshot.paramMap.get('encodedPath');
    if (!encodedPath) return;

    const decodedPath = decodeURIComponent(encodedPath);
    this.showName = decodedPath.split('/').pop() || 'Cartoon';

    this.videoService.getFileStructure(decodedPath).subscribe(data => {
      this.seasons = (data.children || [])
        .filter(item => item.folder)
        .map(season => ({ ...season, expanded: false })); // initialize expanded state
    });
  }

  toggleSeason(season: FileNode) {
    season.expanded = !season.expanded;
  }

  playVideo(file: FileNode) {
    const videoElement = document.querySelector("video");
  
    // Pause and reset video if already playing
    if (videoElement) {
      videoElement.pause();
      videoElement.removeAttribute('src'); // Remove the current src
      videoElement.load(); // Reset the video element
    }
  
    // Set new video details
    this.selectedVideoUrl = this.videoService.getVideoUrl(file.path);
    this.selectedVideoName = file.name;
  
    // Allow Angular to update the DOM, then play
    setTimeout(() => {
      const newVideoElement = document.querySelector("video");
      if (newVideoElement) {
        newVideoElement.load();
        newVideoElement.play();
      }
    }, 100);
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  

}
