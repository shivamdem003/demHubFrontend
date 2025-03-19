import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FileNode {
  name: string;
  path: string;
  folder: boolean;  // ✅ Update to match your JSON structure
  children?: FileNode[];
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://localhost:9090/videos';

  constructor(private http: HttpClient) {}

  getFileStructure(path?: string): Observable<FileNode> {
    const url = path ? `${this.baseUrl}?path=${encodeURIComponent(path)}` : this.baseUrl;
    return this.http.get<FileNode>(url);
  }

  getVideoUrl(filePath: string): string {
    return `${this.baseUrl}/play?path=${encodeURIComponent(filePath)}`;
  }
}
