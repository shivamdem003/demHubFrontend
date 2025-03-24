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
  filteredFolders: FileNode[] = [];
  selectedVideoUrl: string | null = null;
  selectedVideoName: string | null = null;
  searchQuery: string = '';

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.loadRootFolder();
  }

  loadRootFolder() {
    this.videoService.getFileStructure().subscribe(data => {
      this.rootFolder = data;
      this.filteredFolders = data.children || [];
    });
  }

  toggleFolder(folder: FileNode) {
    if (!folder.folder) return;

    if (!folder.expanded) {
      this.videoService.getFileStructure(folder.path).subscribe(data => {
        folder.children = data.children || [];
        folder.expanded = true;
      });
    } else {
      folder.expanded = false;
    }
  }

  playVideo(filePath: string, videoName: string) {
    const videoElement = document.querySelector("video");
    this.selectedVideoName = videoName;

    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }

    this.selectedVideoUrl = this.videoService.getVideoUrl(filePath);
    setTimeout(() => {
      if (videoElement) {
        videoElement.load();
        videoElement.play();
      }
    }, 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Implement search functionality
  filterFolders(searchQuery: string) {
    if (!this.rootFolder) return;
  
    const searchLower = searchQuery.toLowerCase();
  
    const filterRecursive = (nodes: FileNode[]): FileNode[] => {
      return nodes
        .map(node => ({
          ...node,
          children: node.children ? filterRecursive(node.children) : [],
        }))
        .filter(node => node.name.toLowerCase().includes(searchLower) || (node.children && node.children.length > 0));
    };
  
    this.filteredFolders = filterRecursive(this.rootFolder.children || []);
  }
}