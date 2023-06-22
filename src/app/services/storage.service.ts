import { Injectable } from '@angular/core';
import { Mail } from '../types/mail';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public emails: Mail[] = []

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error(`Error parsing localStorage item with key '${key}':`, error);
      }
    }
    return null;
  }

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing item in localStorage with key '${key}':`, error);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }



  clear(): void {
    localStorage.clear();
  }
}
