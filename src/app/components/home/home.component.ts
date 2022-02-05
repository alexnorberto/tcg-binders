import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDataSubscription;

  userData;

  constructor(private firestore: FirebaseService,
              private userDataService: UserDataService) {

  }

  ngOnInit(): void {

    this.userDataSubscription = this.userDataService.currentUserData
      .subscribe(user => {
        this.userData = user;
        console.log(this.userData);
      });



  }

  logout(): void {
  }
}
