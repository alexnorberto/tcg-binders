import {Injectable} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {TcgApiService} from "../../services/tcg-api.service";

@Injectable({
  providedIn: 'root'
})
export class SearchViewManager {

  /**
   * Request user main collection from firestore
   * @param userId
   */
  requestUserMainCollection(userId) {
    return this.firebaseService.getMainCardsCollection();
  }

  constructor(
    private firebaseService: FirebaseService,
    private tcgApiService: TcgApiService
  ) {
  }


}
