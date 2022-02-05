import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CardItemModel} from "../../shared/models/card-item.model";
import {FormControl, FormGroup} from "@angular/forms";
import {SearchViewManager} from "../../components/search-view/search-view.manager";

/**
 * This component renders the logic for the cards search form and paginator
 */
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

  /**
   * Define the display options
   */
  displayOptions = ['List', 'Full', 'Images'];

  /**
   * Defines the sort options
   */
  sortOptions = [
    {key: 'Name Ascending', value: 'name'},
    {key: 'Name Descending', value: '-name'},
    {key: 'Number Ascending', value: 'number'},
    {key: 'Number Descending', value: '-number'},
    {key: 'Release Ascending', value: 'set.releaseDate'},
    {key: 'Release Descending', value: '-set.releaseDate'},
  ];

  /** FormControl for the search-view input */
  searchForm = new FormGroup({
    searchItem: new FormControl(''),
    displayOption: new FormControl('Images'),
    sortOption: new FormControl(this.sortOptions[0])
  });

  /** Bind the search-view item on input typed by the user */
  searchItem: string = "";

  /** Length of the search-view paginator */
  paginatorlength: number = 0;

  /** Page size of the search-view paginator */
  paginatorPageSize = 20;

  @Output() searchListEmitter = new EventEmitter<any>();

  /**
   * Get a form value from search form passing the form control name
   * @param formControlName
   */
  getFormValue(formControlName) {
    return this.searchForm.controls[formControlName].value;
  }

  /**
   * Search with basic criteria using input field text
   * Before the search-view, always update the user collection info
   * @param searchItem
   */
  basicSearch(searchItem = "", page = 1): void {
    this.manager.requestCards(this.searchItem, page, this.paginatorPageSize, this.getFormValue('sortOption').value).subscribe(
      (result: any) => {
        this.searchList = result.data;
        this.paginatorlength = result.totalCount;
        this.setQuantityToSearchList(result.data);
      });
  }

  /**
   * Adds quantity attribute to tcg cards on searchList
   * Sets the user collection quantity for a card to the search-view list cards
   */
  setQuantityToSearchList(searchList) {
    searchList.forEach(tcgCard => {
      tcgCard.quantity = 0;
      this.userMainCardsCollection.forEach(userCard => {
        if (userCard.id === tcgCard.id) {
          tcgCard.quantity = userCard.quantity;
        }
      });
    });
    this.searchList = searchList;
    this.searchListEmitter.emit(this.searchList);
  }

  /**
   * On paginate, calls basic search to get more from the list
   * @param event
   */
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
    this.searchForm.get("searchItem").valueChanges.subscribe(value => {
      this.searchItem = value;
    })
    this.basicSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userMainCardsCollection) {
      this.basicSearch();
    }
  }

}
