export interface FileNode {
  name: string;
  path: string;
  folder: boolean;
  children?: FileNode[];

  expanded?: boolean;
}
