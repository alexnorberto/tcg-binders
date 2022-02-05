import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {UserDataService} from "../../services/user-data.service";
import {UserDataModel} from "../../shared/models/user-data.model";
import {CardItemModel} from "../../shared/models/card-item.model";
import {SearchViewManager} from "./search-view.manager";
import {TcgCardModel} from "../../shared/models/tcg-card.model";
import {LocalStorageService} from "../../services/local-storage.service";


@Component({
  selector: 'app-search',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css'],
  providers: [
    SearchViewManager
  ]
})
export class SearchViewComponent implements OnInit, OnChanges, AfterViewInit {

  /** Store the logged user data */
  userData: UserDataModel;

  /** Store the user base collection cards from firestore */
  userMainCardsCollection: any = [];

  /** Variable to storage the list of searched items from api */
  searchList: Array<TcgCardModel> = [];

  isLoadingUserCollection = true;

  receiveSearchData(searchData) {
    this.searchList = searchData
  }

  /**
   * Search with basic criteria using input field text
   * Before the search-view, always update the user collection info
   * @param searchItem
   */
  getUserBaseCollection(): void {
    this.isLoadingUserCollection = true;
    this.manager.requestUserBaseCollection(this.userData.email).subscribe(
      (collection: any) => {
        console.log('loading false')
        this.userMainCardsCollection = collection ? collection : [];
        this.isLoadingUserCollection = false;
      });
  }

  constructor(
    private manager: SearchViewManager,
    private userDataService: UserDataService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.userData = this.localStorageService.getUserData();
    if (!this.userData.email) {
      this.isLoadingUserCollection = false;
    } else {
      this.getUserBaseCollection();
    }
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
  }

}
