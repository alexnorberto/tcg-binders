import {Injectable, OnChanges, SimpleChanges} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirebaseService} from "../../services/firebase.service";
import {UserDataService} from "../../services/user-data.service";
import {TcgApiService} from "../../services/tcg-api.service";
import {TcgCardModel} from "../../shared/models/tcg-card.model";
import {CardItemModel} from "../../shared/models/card-item.model";
import {LocalStorageService} from "../../services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CardCollectionControlManager implements OnChanges {

  cardsList = [];

  addCardsToMainCardsCollection(cardsList) {
    const userEmail = this.localStorageService.getUserData().email ? this.localStorageService.getUserData().email : null;
    this.firebaseService.setCards(userEmail, this.manageTcgCardsList(JSON.parse(JSON.stringify(cardsList))));
    this.firebaseService.setCardsToCollection(userEmail, this.manageUserCardsList(JSON.parse(JSON.stringify(cardsList))));
  }

  /**
   * Returns a tcgCard without quantity to be added on cards root firestore
   * @param tcgCardsList
   */
  manageTcgCardsList(tcgCardsList): Array<TcgCardModel> {
    let newTcgCardsList = [];
    tcgCardsList.forEach(card => {
      newTcgCardsList.push(card);
    });
    newTcgCardsList.map(card => delete card.quantity)
    return this.filterCardsById(newTcgCardsList);
  }

  /**
   * Returns an object {id, quantity} to represent a user card reference
   * @param userCardsList
   */
  manageUserCardsList(userCardsList): Array<CardItemModel> {
    let newCardsList = [];
    userCardsList.forEach(card => {
      newCardsList.push({
        id: card.id,
        quantity: card.quantity
      });
    });
    return this.filterCardsById(newCardsList);
  }

  /**
   * Remove duplicated cards checking cards by Id
   * @param cardsList
   */
  filterCardsById(cardsList) {
    const uniqueCards = new Set();
    const filteredCardsList = cardsList.filter((card) => {
      const isPresentInSet = uniqueCards.has(card.id);
      uniqueCards.add(card.id);
      return !isPresentInSet;
    });
    return filteredCardsList;
  }


  constructor(
    private firebaseService: FirebaseService,
    private userDataService: UserDataService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
