import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorageProvider {

  // private db: SQLiteObject;
  
  constructor(public http: HttpClient) {
    console.log('Hello SqlStorageProvider Provider');
  }

}
