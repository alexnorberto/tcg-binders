import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserDataModel} from "../../shared/models/user-data.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserDataService} from "../../services/user-data.service";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() userData: UserDataModel;

  isProgressVisible: boolean;
  firebaseErrorMessage: string;
  userDataForm: FormGroup;

  editUserData() {
    if (this.userDataForm.invalid)                            // if there's an error in the form, don't submit it
      return;
    this.isProgressVisible = true;
    this.userData.displayName = this.userDataForm.get('name').value;
    this.userData.displayName_lower = this.userDataForm.get('name').value.toLowerCase();
    if(!this.userData.cards) {
      this.userData.cards = [];
    }
    if(!this.userData.collections) {
      this.userData.collections = [];
    }
    this.firebaseService.updateUser(this.userData);
    this.userDataService.changeUserData(this.userData);
  }

  constructor(
    public angularFireAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private userDataService: UserDataService,

  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.userDataForm = new FormGroup({
      'name': new FormControl(this.userData.displayName, Validators.required)
    });
  }

}
