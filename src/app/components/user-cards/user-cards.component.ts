import { OnInit, Component } from '@angular/core';
import {TcgCardModel} from "../../shared/models/tcg-card.model";
import {SelectionModel} from "@angular/cdk/collections";
import {FormControl} from "@angular/forms";
import {UserDataService} from "../../services/user-data.service";
import {UserDataModel} from "../../shared/models/user-data.model";
import {FirebaseService} from "../../services/firebase.service";
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserCardsComponent implements OnInit {

  selectedCardList = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'number',  'set', 'rarity', 'artist', 'quantity', 'collections', 'select'];
  collectionsFormControl = new FormControl();

  selection = new SelectionModel<TcgCardModel>(true, []);

  expandedElement: any | null;

  userData = new UserDataModel();
  userCollections = [];
  userDataCards = []
  paginatorlength: number = 0;
  paginatorPageSize: number = 5;

  onPaginate(event) {
    console.log("On Paginate", event);
    let page = event.pageIndex;
    this.paginatorPageSize = event.pageSize;
    this.setDataSourceTable(page);
  }

  setDataSourceTable(page = 0) {
    let start = page * this.paginatorPageSize;
    let end = start + this.paginatorPageSize;
    if (this.userData.cards) {
      this.paginatorlength = this.userData.cards.length;
      this.dataSource.data = this.userData.cards.slice(start, end);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.selectedCardList = this.selection.selected;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      console.log('lista',this.selectedCardList)
      this.selection.clear();
      this.selectedCardList = [];
      console.log('lista',this.selectedCardList)
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.selectedCardList = this.selection.selected;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      let resultCollections = false;
      if (data.collections) {
        data.collections.forEach(col => {
          if (col.collection.toString().toLowerCase().includes(filter)) {
            resultCollections = true;
          }
        });
      }

      return (
        data.set.name.toString().toLowerCase().includes(filter) ||
        data.number.toString().toLowerCase().includes(filter) ||
        data.name.toString().toLowerCase().includes(filter) ||
        data.rarity.toString().toLowerCase().includes(filter) ||
        data.artist.toString().toLowerCase().includes(filter) || resultCollections
      );
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }


  constructor(
    private userDataService: UserDataService,
    private firebaseService: FirebaseService
  ) {
    this.dataSource = new MatTableDataSource(this.userData.cards);
  }

  ngOnInit() {
    this.userDataService.currentUserData
      .subscribe(user => {
        if(user.cards){
          this.userData = user;
          this.userCollections = this.userData.collections;
          this.setDataSourceTable();
        }
      });
  }

}

function searchMatch(item, list, key = null) {
  console.log("searchMatch", item)
  if (item != null && list != null) {
    for (let i = 0; i < list.length; i++) {
      if (key != null) {
        if (item == list[i][key]) {
          return i;
        }
      } else {
        if (item == list[i]) {
          return i;
        }
      }
    }
  }
  return null;
}
