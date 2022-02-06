import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CardItemModel} from "../../shared/models/card-item.model";
import {FormControl, FormGroup} from "@angular/forms";
import {CardsSearchFormManager} from "./cards-search-form.manager";
import {MatPaginator} from "@angular/material/paginator";

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

  filteredMainCardsCollection = [];

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
    sortOption: new FormControl(this.sortOptions[0]),
    collectionFilter: new FormControl('1')
  });

  /** Bind the search-view item on input typed by the user */
  searchItem: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Length of the search-view paginator */
  paginatorlength: number = 0;

  /** Page size of the search-view paginator */
  paginatorPageSize = 20;

  /**
   * Stores the current page on paginator
   */
  currentPage = 1;

  showOnlyUserCards = false;

  /**
   * Event to emit the current shown search list
   */
  @Output() searchListEmitter = new EventEmitter<any>();

  /**
   * Set from which data base get data (tcgApi or fireStore user collection)
   */
  setCardsSource(showOnlyUserCards){
    this.showOnlyUserCards = showOnlyUserCards;
  }

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
    if (!this.showOnlyUserCards) {
      // Request from TCG API
      this.manager.requestTcgApiCards(searchItem, page, this.paginatorPageSize, this.getFormValue('sortOption').value).subscribe(
        (result: any) => {
          // this.searchList = result.data;
          this.paginatorlength = result.totalCount;
          this.setQuantityToSearchList(result.data);
        });

    } else {
      // Use data from firestore (no request need here - data passed from parent)
          this.paginatorlength = this.userMainCardsCollection.length;
          this.currentPage = 1;
          this.paginator.pageIndex = 0;
          this.searchList = this.userMainCardsCollection.slice(0, this.paginatorPageSize - 1);
          this.searchListEmitter.emit(this.searchList);
    }
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
    this.currentPage = event.pageIndex + 1;
    this.paginatorPageSize = event.pageSize;

    if (!this.showOnlyUserCards) {
      this.basicSearch(this.searchItem, this.currentPage);
    } else {
      const start = ((this.currentPage - 1) * this.paginatorPageSize);
      const end = (((this.currentPage - 1) * this.paginatorPageSize) + this.paginatorPageSize -1);
      this.searchList = this.userMainCardsCollection.slice(start, end);
      this.searchListEmitter.emit(this.searchList);
    }
  }

  constructor(
    private manager: CardsSearchFormManager
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
      this.basicSearch(this.searchItem, this.currentPage);
    }
  }

}
