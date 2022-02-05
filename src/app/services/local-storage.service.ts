import { Injectable } from '@angular/core';

/**
 * This services deal with local storage
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  deleteUserData() {
    localStorage.removeItem('userData');
  }

  constructor() { }

}
