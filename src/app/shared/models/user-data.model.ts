import {TcgCardModel} from "./tcg-card.model";
import {CardCollectionModel} from "./card-collection.model";

export class UserDataModel {
  displayName: string;
  displayName_lower: string;
  email: string;
  email_lower: string;
  cards: Array<TcgCardModel>;
  collections: Array<CardCollectionModel>;
}
