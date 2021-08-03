import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserDataModel} from "../shared/models/user-data.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private messageSource = new BehaviorSubject(new UserDataModel());
  currentUserData = this.messageSource.asObservable();

  changeUserData(userData: UserDataModel) {
    this.messageSource.next(userData)
  }

  setUserData(userData = null, name = null, email = null, cards = null, collection = null) {
    console.log("Entradas do SetUserData",userData,name,email,cards,collection)
    let response: UserDataModel;
    if (userData) {
      response = {
        displayName: name ? name : userData.displayName,
        displayName_lower: name ? name.toLowerCase() : userData.displayName.toLowerCase(),
        email: email ? email : userData.email,
        email_lower: email ? email.toLowerCase() : userData.email.toLowerCase(),
        cards: cards ? cards : userData.cards,
        collections: collection ? collection : userData.collections
      };
    } else {
      response = {
        displayName: "",
        displayName_lower: "",
        email: "",
        email_lower: "",
        cards: [],
        collections: []
      };
    }
    this.changeUserData(response);
    return response;
  }

  constructor(
    private authService: AuthService
  ) { }
}
