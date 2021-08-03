import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {UserDataModel} from "../../shared/models/user-data.model";
import {TcgApiService} from "../../services/tcg-api.service";
import {FirebaseService} from "../../services/firebase.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";
import {UserDataService} from "../../services/user-data.service";

@Component({
  selector: 'app-card-collection-control',
  templateUrl: './card-collection-control.component.html',
  styleUrls: ['./card-collection-control.component.css']
})
export class CardCollectionControlComponent implements OnInit {

  @Input() card;
  @Input() userData;
  originalQuantity = 0;

  addOne(bool){
    if(bool){
      this.card.quantity++;
    } else {
      if(this.card.quantity > 0) {
        this.card.quantity--
      }
    }
  }

  addCardToUserData() {
    if (this.card.quantity != null) {
      let currentCard = this.card;
      let tempCards = [];
      this.userData.cards.forEach(userCard => {
        let found = false;
        if(userCard.id == currentCard.id) {
          found = true;
        }
        if(!found) {
          tempCards.push(userCard);
        }
      });
      if(currentCard.quantity > 0) {
        tempCards = tempCards.concat(currentCard);
      }
      this.firebaseService.updateUser(this.userDataService.setUserData(this.userData, null, null, tempCards));
    }
  }

  constructor(
    private firebaseService: FirebaseService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    if (this.card.quantity != null) {
      this.originalQuantity = this.card.quantity;
    } else {
      this.card.quantity = 0;
      this.originalQuantity = 0;
    }
  }

}
