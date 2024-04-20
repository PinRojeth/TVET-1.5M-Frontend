import { MongoObject } from './mongo-object';

export interface NSAFToken extends MongoObject {
  nsaf_token: string;
}
