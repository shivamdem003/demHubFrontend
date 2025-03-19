import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';

interface FileNode {
  name: string;
  path: string;
  folder: boolean;  // ✅ Update to match your JSON structure
  children?: FileNode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-video-browser',
  standalone: false,
  templateUrl: './video-browser.component.html',
  styleUrl: './video-browser.component.css'
})
export class VideoBrowserComponent implements OnInit {
  rootFolder: FileNode | null = null;
  selectedVideoUrl: string | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.loadRootFolder();
  }

  loadRootFolder() {
    this.videoService.getFileStructure().subscribe(data => {
      this.rootFolder = data;
      console.log("Loaded Root Folder:", data);  // ✅ Debugging Log
    });
  }

  toggleFolder(folder: FileNode) {
    if (!folder.folder) return; // ✅ Only expand folders

    if (!folder.expanded) {
      this.videoService.getFileStructure(folder.path).subscribe(data => {
        folder.children = data.children || [];
        folder.expanded = true;
        console.log("Expanded Folder:", folder.name, folder.children);  // ✅ Debugging Log
      });
    } else {
      folder.expanded = false; // Collapse folder
    }
  }

  // playVideo(filePath: string) {
  //   this.selectedVideoUrl = this.videoService.getVideoUrl(filePath);
  //   console.log("Playing Video:", filePath);  // ✅ Debugging Log
  // }

  playVideo(filePath: string) {
    const videoElement = document.querySelector("video");
  
    // Stop current video before switching
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  
    // Set new video URL
    this.selectedVideoUrl = this.videoService.getVideoUrl(filePath);
    console.log("Playing Video:", this.selectedVideoUrl);  // ✅ Debugging Log
  
    // Ensure the new video starts playing automatically after setting the source
    setTimeout(() => {
      if (videoElement) {
        videoElement.load();
        videoElement.play();
      }
    }, 100);
  }
}
