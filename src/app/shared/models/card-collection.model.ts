import {TcgCardModel} from "./tcg-card.model";
import {BinderModel} from "./binder.model";

export class CardCollectionModel {
  name: string;
  cards: Array<TcgCardModel>;
  binders: Array<BinderModel>;
}
