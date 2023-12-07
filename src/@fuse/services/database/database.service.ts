import { Injectable } from '@angular/core';
import { Storage }    from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private storage: Storage | null = null;

  constructor(private ionicStorage: Storage) {
    this.init().then(() => console.log('DatabaseService init'));
  }

  async init() {
    this.storage = await this.ionicStorage.create();
  }

  public async set(key: string, value: any): Promise<any> {
    return this.storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return this.storage?.get(key);
  }

  public async remove(key: string): Promise<any> {
    return this.storage?.remove(key);
  }

  public async clear(): Promise<void> {
    return this.storage?.clear();
  }
}
