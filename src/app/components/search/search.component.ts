import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {TcgApiService} from "../../services/tcg-api.service";
import {FirebaseService} from "../../services/firebase.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {FormControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserDataService} from "../../services/user-data.service";
import {UserDataModel} from "../../shared/models/user-data.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges,AfterViewInit {

  count = 0;
  userData: UserDataModel;
  /**
   * Variable to storage the list of searched items from api
   */
  searchList: Array<any> = [];
  searchItem: string = "";
  cardsToAddList = [];
  /**
   * FormControl for the search input
   */
  searchForm = new FormControl('');

  paginatorlength: number = 0;
  paginatorPageSize: number = 20;

  onPaginate(event) {
    let page = event.pageIndex + 1;
    this.paginatorPageSize = event.pageSize;
    this.basicSearch(this.searchItem, page);
  }

  /**
   * Search with basic criteria using input field text
   * @param searchItem
   */
  basicSearch(searchItem = "", page = 1) {
    this.searchItem = searchItem;
    this.tcgApiService.simpleCardSearch(searchItem, page, this.paginatorPageSize).subscribe(
      result => {
        this.searchList = result.data;
        this.paginatorlength = result.totalCount;
        this.compareSearchListWithUserCards();
      });
  }

  /**
   * Compare the current search list with user cards, adding useful attributes to the cards on list
   */
  compareSearchListWithUserCards(list = this.searchList) {
    let searchList = list;
    if (this.userData.cards) {
      let userCards = this.userData.cards;
      searchList.forEach(card => {
        if (card.quantity == null) {
          card = this.setCardAttributes(card);
        }
        userCards.forEach(userCard => {
          if (card.id == userCard.id) {
            console.log("card",card.name,card.quantity)
            card.quantity = userCard.quantity;
            card.collections = userCard.collections;
            console.log("card",userCard.name,userCard.quantity)
          }
        });
      });
      this.searchList = searchList;
    }
  }

  /**
   * Setup attributes
   */
  setCardAttributes(card) {
    console.log("setou pra zero")
    card.quantity = 0;
    card.collections = [];
    return card;
  }

  /**
   * Load cards when opens page
   */
  getCards() {
    this.tcgApiService.get().subscribe(
      r => {
        console.log(r);
        this.searchList = r.data;
        this.paginatorlength = r.totalCount;
        this.compareSearchListWithUserCards();
      },
      error => console.log(error)
    );
  }

  constructor(
    private tcgApiService: TcgApiService,
    private firebaseService: FirebaseService,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
    private userDataService: UserDataService
  ) {
  }

  ngOnInit(): void {
    this.userDataService.currentUserData.subscribe(user => {
      console.log(user.email)
      this.userData = user;
      this.getCards();
    });
  }

  ngAfterViewInit() {
  }

  ngOnChanges() {
  }

}
