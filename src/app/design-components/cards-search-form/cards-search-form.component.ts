import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CardItemModel} from "../../shared/models/card-item.model";
import {FormControl, FormGroup} from "@angular/forms";
import {SearchViewManager} from "../../components/search-view/search-view.manager";

@Component({
  selector: 'app-cards-search-form',
  templateUrl: './cards-search-form.component.html',
  styleUrls: ['./cards-search-form.component.css']
})
export class CardsSearchFormComponent implements OnInit, OnChanges {

  /** Store the user base collection cards from firestore */
  @Input() userMainCardsCollection: any = [];

  /** Variable to storage the list of searched items from api */
  searchList: Array<CardItemModel> = [];

  /** FormControl for the search-view input */
  searchForm = new FormGroup({
    searchItem: new FormControl(''),
    displayOption: new FormControl(''),
    sortOption: new FormControl('')
  });

  /** Bind the search-view item on input typed by the user */
  searchItem: string = "";

  /** Length of the search-view paginator */
  paginatorlength: number = 0;

  /** Page size of the search-view paginator */
  paginatorPageSize = 20;

  @Output() searchListEmitter = new EventEmitter<any>();

  /**
   * Search with basic criteria using input field text
   * Before the search-view, always update the user collection info
   * @param searchItem
   */
  basicSearch(searchItem = "", page = 1): void {
    this.searchItem = searchItem;
    this.manager.requestCards(searchItem, page, this.paginatorPageSize).subscribe(
      (result: any) => {
        this.searchList = result.data;
        this.paginatorlength = result.totalCount;
        this.searchListEmitter.emit(this.searchList);
        this.setQuantityToSearchList(result.data);
      });
  }

  /**
   * Adds quantity attribute to tcg cards on searchList
   * Sets the user collection quantity for a card to the search-view list cards
   */
  setQuantityToSearchList(searchList) {
    console.log(searchList)
    this.userMainCardsCollection.forEach(userCard => {
      searchList.forEach(tcgCard => {
        if (userCard.id === tcgCard.id) {
          tcgCard.quantity = userCard.quantity;
        } else {
          tcgCard.quantity = 0;
        }
      });
    });
    console.log(searchList)
  }

  onPaginate(event) {
    let page = event.pageIndex + 1;
    this.paginatorPageSize = event.pageSize;
    this.basicSearch(this.searchItem, page);
  }

  constructor(
    private manager: SearchViewManager
  ) {
  }

  ngOnInit() {
    this.basicSearch();
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes)
  }

}
