import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserDataModel} from "../shared/models/user-data.model";
import {AuthService} from "./auth.service";
import {LocalStorageService} from "./local-storage.service";

/**
 * Service to deal with user data
 */
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private messageSource = new BehaviorSubject(new UserDataModel());

  /**
   * Observable to the current user data
   */
  currentUserData = this.messageSource.asObservable();

  changeUserData(userData: UserDataModel) {
    this.messageSource.next(userData)
  }

  /**
   * Given user data, group this data into one single object
   * @param userData
   * @param name
   * @param email
   * @param cards
   * @param collection
   */
  setUserData(userData = null, name = null, email = null, cards = null, collection = null) {
    let response: UserDataModel;
    if (userData) {
      response = {
        displayName: name ? name : userData.displayName,
        displayName_lower: name ? name.toLowerCase() : userData.displayName.toLowerCase(),
        email: email ? email : userData.email,
        email_lower: email ? email.toLowerCase() : userData.email.toLowerCase()
      };
    } else {
      response = {
        displayName: "",
        displayName_lower: "",
        email: "",
        email_lower: ""
      };
    }
    this.changeUserData(response);
    this.localStorageService.saveUserData(response);
    return response;
  }

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }
}
