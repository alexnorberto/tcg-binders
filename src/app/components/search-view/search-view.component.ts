import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {UserDataService} from "../../services/user-data.service";
import {UserDataModel} from "../../shared/models/user-data.model";
import {SearchViewManager} from "./search-view.manager";
import {TcgCardModel} from "../../shared/models/tcg-card.model";
import {LocalStorageService} from "../../services/local-storage.service";
import {finalize} from "rxjs/operators";


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
  getUserMainCollection(): void {
    console.log('getUserMainCollection')
    this.isLoadingUserCollection = true;
    this.manager.requestUserMainCollection(this.userData.email)
      .subscribe(
      (collection: any) => {
        console.log('conluiu a busca???');
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
    console.log('start search view', this.userData.email);
    if (!this.userData.email) {
      console.log('deslogado')
      this.isLoadingUserCollection = false;
    } else {
      console.log('logado')
      this.getUserMainCollection();
    }
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
  }

}
