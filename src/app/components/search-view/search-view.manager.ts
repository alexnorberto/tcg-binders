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
    return this.firebaseService.getCollectionById(userId);
  }

  /**
   * Request cards from TCG API
   * @param searchItem
   * @param page
   * @param paginatorPageSize
   * @param orderBy
   */
  requestCards(searchItem, page, paginatorPageSize, orderBy = 'name') {
    console.log('---', searchItem, page, paginatorPageSize, orderBy)
    return this.tcgApiService.simpleCardSearch(searchItem, page, paginatorPageSize, orderBy);
  }

  constructor(
    private firebaseService: FirebaseService,
    private tcgApiService: TcgApiService
  ) {
  }


}
