import {Injectable} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {TcgApiService} from "../../services/tcg-api.service";

@Injectable({
  providedIn: 'root'
})
export class CardsSearchFormManager {

  /**
   * Request cards from TCG API
   * @param searchItem
   * @param page
   * @param paginatorPageSize
   * @param orderBy
   */
  requestTcgApiCards(searchItem, page, paginatorPageSize, orderBy = 'name') {
    return this.tcgApiService.simpleCardSearch(searchItem, page, paginatorPageSize, orderBy);
  }

  /**
   * Request cards from TCG API
   */
  requestUserCollectionCards() {
    return this.firebaseService.getMainCardsCollection()
  }

  constructor(
    private firebaseService: FirebaseService,
    private tcgApiService: TcgApiService
  ) {
  }


}
