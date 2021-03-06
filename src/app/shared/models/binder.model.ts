export class BinderModel {
  name: string;
  pagination: [number,number,number]; //[2,2,200] a binder 2x2 with 200 pages. A [0,0,0] represents a collection not in a binder
  completed: boolean; //true for complete
  cards: Array<BinderPocket>;
}

export class BinderPocket {
  /**
   * Ordered list of cards ID contained in a binder pocket
   */
  cardsId: Array<string>
}
