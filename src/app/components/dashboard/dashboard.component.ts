import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/database";
import {UserDataModel} from "../../shared/models/user-data.model";
import {Subscription} from 'rxjs';
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  collectionsList:any;
  updateCollectionsList(list){
    this.collectionsList = list;
  }

  isProgressVisible: boolean;
  firebaseErrorMessage: string;
  userDataSubscription: Subscription;

  user: Observable<any>;              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)
  userData: UserDataModel;

  @Output() userDataOutput = new EventEmitter<UserDataModel>();

  emitUserData() {
    this.userDataOutput.emit(this.userData);
  }


  setUserData(userData = null) {
    this.userData = this.userDataService.setUserData(userData);
  }

  getLoggedUserData() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.user = this.firestore.collection('users').doc(user.email.toLowerCase()).valueChanges();
        if (this.user) {
          this.user.subscribe(userData => {
            console.log(userData)
            this.setUserData(userData);
            console.log(this.userData)
          })
        }
      }
    });
  }


  constructor(
    private db: AngularFireDatabase,
    public angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService
  ) {
    this.user = null;
    this.isProgressVisible = false;
    this.firebaseErrorMessage = '';
    this.setUserData();
  }

  ngOnInit(): void {
    this.getLoggedUserData();
    this.userDataSubscription = this.userDataService.currentUserData
      .subscribe(user => this.userData = user);
  }

}
