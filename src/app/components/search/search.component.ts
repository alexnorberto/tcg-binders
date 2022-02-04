import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {TcgApiService} from "../../services/tcg-api.service";
import {FirebaseService} from "../../services/firebase.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {FormControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserDataService} from "../../services/user-data.service";
import {UserDataModel} from "../../shared/models/user-data.model";
import {CardListModel} from "../../shared/models/card-list.model";
import {CardIndexListModel} from "../../shared/models/card-index-list.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges, AfterViewInit {

  /** Store the logged user data */
  userData: UserDataModel;

  /** Store the user base collection cards from firestore */
  userBaseCollection: any = [];

  /** Variable to storage the list of searched items from api */
  searchList: Array<CardListModel> = [];

  /** FormControl for the search input */
  searchForm = new FormControl('');

  /** Bind the search item on input typed by the user */
  searchItem: string = "";

  /** List of cards selected to be add to the user base collection */
  cardsToAddList: Array<CardListModel> = [];

  /** Length of the search paginator */
  paginatorlength: number = 0;

  /** Page size of the search paginator */
  paginatorPageSize: number = 20;

  /**
   * update the cardsToUpdateList when a user add or remove a card from search list
   * @param newList
   */
  updateCardsToAddList(newList) {
    console.log('this.updateCardList();')
    this.cardsToAddList = newList;
  }

  clickAddCardsToUser() {
    this.firebaseService.setMultipleCards(this.userData.email, this.cardsToAddList);
    this.addCardsToBaseUserCollection();
  }

  addCardsToBaseUserCollection() {
    let newCardsToAddList = this.setCardIndexList(this.cardsToAddList);
    console.log('newCardsToAddList',newCardsToAddList)
    if (!this.userBaseCollection?.cards) {
      this.firebaseService.setCardsToUserCollection(this.userData.email, newCardsToAddList);
    } else {
      let newUserBaseCollection = this.userBaseCollection.cards;
      console.log('newUserBaseCollection',newUserBaseCollection)
      let newList = this.mergeLists(newCardsToAddList,newUserBaseCollection);
      console.log('newlist',newList)
      this.firebaseService.setCardsToUserCollection(this.userData.email, newList);
      /*
      let newList = [];
      let newUserBaseCollection = this.setCardIndexList(this.userBaseCollection.cards);

      this.userBaseCollection.cards.forEach((userBaseCard, baseIndex) => {
        this.cardsToAddList.forEach((cardToAdd, toAddIndex) => {
          if (userBaseCard.card.id == cardToAdd.card.id) {

            let quantity = userBaseCard.quantity + cardToAdd.quantity;
            newList.push({
              cardIndex: userBaseCard.card.id,
              quantity: quantity
            });
            newCardsToAddList.splice(toAddIndex, 1);
            newUserBaseCollection.splice(baseIndex, 1);

          }
        });
      });

      newList = newList.concat(newCardsToAddList).concat(newUserBaseCollection);
      this.firebaseService.setCardsToUserCollection(this.userData.email, newList);
       */
    }
    this.cardsToAddList = [];
  }

  /**
   * Set a Array<CardIndexListModel> list from a given Array<CardLisModel> list
   * @param cardList
   */
  setCardIndexList(cardList: Array<CardListModel>): Array<CardIndexListModel> {
    console.log('setCardIndexList',cardList)
    let cardIndexList: Array<CardIndexListModel> = [];
    cardList.forEach(card => {
      cardIndexList.push({
        id: card.card.id,
        quantity: card.quantity
      });
    });
    return cardIndexList;
  }

  /**
   * Merge two card lists, filtering duplicated entries by merging their quantity values
   * @param cardIndexList1
   * @param cardIndexList2
   */
  mergeLists(cardIndexList1: Array<CardIndexListModel>, cardIndexList2: Array<CardIndexListModel>): Array<CardIndexListModel> {
    let mergedList: Array<CardIndexListModel> = [];
    let newCardIndexList1 = cardIndexList1;
    let newCardIndexList2 = cardIndexList2;
    cardIndexList1.forEach((card1, card1Index) => {
      cardIndexList2.forEach((card2, card2Index) => {
        if (card1.id == card2.id) {
          let quantity = card1.quantity + card2.quantity;
          mergedList.push({
            id: card1.id,
            quantity: quantity
          });
          newCardIndexList1.splice(card1Index, 1);
          newCardIndexList2.splice(card2Index, 1);
        }
      });
    });
    mergedList = mergedList.concat(newCardIndexList1).concat(newCardIndexList2);
    return mergedList;
  }


  /**
   * Search with basic criteria using input field text
   * @param searchItem
   */
  basicSearch(searchItem = "", page = 1): void {
    this.searchItem = searchItem;
    this.tcgApiService.simpleCardSearch(searchItem, page, this.paginatorPageSize).subscribe(
      result => {
        this.searchList = this.setQuantityOnSearchList(result.data);
        this.paginatorlength = result.totalCount;
      });
  }

  /**
   * Format the search list result from API to Array<CardListModel> type
   * @param cardList
   */
  setQuantityOnSearchList(cardList): Array<CardListModel> {
    let result: Array<CardListModel> = cardList.map(card => {
      let found = false;
      let newCard = {
        card: card,
        quantity: 0
      };
      this.cardsToAddList.forEach(cardToAdd => {
        if (cardToAdd.card.id == card.id) {
          found = true;
          newCard = {
            card: card,
            quantity: cardToAdd.quantity
          }
        }
      });
      return newCard;
    });
    return result;
  }

  onPaginate(event) {
    let page = event.pageIndex + 1;
    this.paginatorPageSize = event.pageSize;
    this.basicSearch(this.searchItem, page);
  }

  getUserBaseCollection(userId) {
    this.firebaseService.getCollectionById(userId, userId).subscribe(
      collection => {
        this.userBaseCollection = collection;
      }
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
      this.basicSearch();
      this.getUserBaseCollection(user.email);
    });
  }

  ngAfterViewInit() {

  }

  ngOnChanges() {
  }

}
