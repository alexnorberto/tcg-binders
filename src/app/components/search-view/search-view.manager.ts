import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirebaseService} from "../../services/firebase.service";
import {UserDataService} from "../../services/user-data.service";
import {TcgApiService} from "../../services/tcg-api.service";

@Injectable({
  providedIn: 'root'
})
export class SearchViewManager {

  requestUserBaseCollection(userId) {
    return this.firebaseService.getCollectionById(userId);
  }

  addCardsToMainCardsCollection(userMail, cardsList, cardsToAddList) {
    this.firebaseService.setCards(userMail, cardsToAddList);
    console.log(cardsList);
    this.firebaseService.setCardsToCollection(userMail, cardsList);
  }

  requestCards(searchItem, page, paginatorPageSize) {
    return this.tcgApiService.simpleCardSearch(searchItem, page, paginatorPageSize);
  }

  constructor(
    private firebaseService: FirebaseService,
    private tcgApiService: TcgApiService
  ) {
  }


}
