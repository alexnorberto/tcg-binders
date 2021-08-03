import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Subscription} from 'rxjs';
import {UserDataService} from "../../services/user-data.service";
import {UserDataModel} from "../../shared/models/user-data.model";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-main-tool-bar',
  templateUrl: './main-tool-bar.component.html',
  styleUrls: ['./main-tool-bar.component.css']
})
export class MainToolBarComponent implements OnInit {

  userMail:string;
  userData: UserDataModel;
  userDataSubscription: Subscription;

  getLoggedUserData() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        let loggedUser = this.angularFirestore.collection('users').doc(user.email.toLowerCase()).valueChanges();
        if (loggedUser) {
          loggedUser.subscribe(userData => {
            this.userDataService.setUserData(userData);
          })
        }
      }
    });
  }

  constructor(
    public angularFireAuth: AngularFireAuth,
    private userDataService: UserDataService,
    private angularFirestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getLoggedUserData();
    this.userDataSubscription = this.userDataService.currentUserData
      .subscribe(user => this.userData = user);
  }

  logout(): void {
    this.angularFireAuth.signOut();
  }
}
