import { Component, OnInit } from '@angular/core';
import { FileNode } from '../../model/file-node.model';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-list-component',
  standalone: false,
  templateUrl: './show-list-component.component.html',
  styleUrl: './show-list-component.component.css'
})
export class ShowListComponentComponent implements OnInit{
  


  shows: FileNode[] = [];
  visibleShows: FileNode[] = [];
  showAll: boolean = false;
  initialLimit: number = 9;

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.videoService.getFileStructure().subscribe((data) => {
      this.shows = (data.children || []).filter(item => item.folder);
      this.updateVisibleShows();
    });
  }

  updateVisibleShows(): void {
    this.visibleShows = this.showAll ? this.shows : this.shows.slice(0, this.initialLimit);
  }

  showMore(): void {
    this.showAll = true;
    this.updateVisibleShows();
  }

  goToShow(show: FileNode): void {
    const encodedPath = encodeURIComponent(show.path);
    this.router.navigate(['/show', encodedPath]);
  }
}
