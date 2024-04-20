import { MongoObject } from './mongo-object';

export interface FileInfo extends MongoObject {
  file?: File;
  file_preview: string;
  file_type: string;
  file_name: string;
}

export interface FileObject extends MongoObject {
  file_id?: string;
  file_name?: string;
  status?: number;
  file_type?: string;
}


export interface ImageList {
  name?: string;
  attachment_data: string | File;
  attachment_type?: string;
  _id?: string | number;
  image_binary?: string;
  remove?: 1 | 0;
}
