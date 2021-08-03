import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';



@Component({
  selector: 'app-binder-book',
  templateUrl: './binder-book.component.html',
  styleUrls: ['./binder-book.component.css']
})
export class BinderBookComponent implements OnInit, AfterViewInit {

  // References to DOM Elements
   @ViewChild('prevBtn') prevBtn;
  @ViewChild('nextBtn') nextBtn;
  @ViewChild('book') book;

  @ViewChild('paper1') paper1;
  @ViewChild('paper2') paper2;
  @ViewChild('paper3') paper3;


// Business Logic
  currentLocation = 1;
  numOfPapers = 3;
  maxLocation = this.numOfPapers + 1;

  openBook() {
    console.log("open book",this.book)
    this.book.style.transform = "translateX(50%)";
    this.prevBtn.style.transform = "translateX(-250px)";
    this.nextBtn.style.transform = "translateX(250px)";
  }

  closeBook(isAtBeginning) {
    console.log("close book 2")
    if(isAtBeginning) {
      this.book.style.transform = "translateX(0%)";
    } else {
      this.book.style.transform = "translateX(100%)";
    }

    this.prevBtn.style.transform = "translateX(0px)";
    this.nextBtn.style.transform = "translateX(0px)";
  }

  goNextPage() {
    console.log("next page", this.currentLocation , this.maxLocation)
    if(this.currentLocation < this.maxLocation) {
      switch(this.currentLocation) {
        case 1:console.log("case 1")
          this.openBook();
          this.paper1.classList.add("flipped");
          this.paper1.style.zIndex = '1';
          break;
        case 2:console.log("case 2")
          this.paper2.classList.add("flipped");
          this.paper2.style.zIndex = '2';
          break;
        case 3:console.log("case 3")
          this.paper3.classList.add("flipped");
          this.paper3.style.zIndex = '3';
          this.closeBook(false);
          break;
        default:
          throw new Error("unkown state");
      }
      this.currentLocation++;
    }
  }

  goPrevPage() {
    console.log("prev page")
    if(this.currentLocation > 1) {
      switch(this.currentLocation) {
        case 2:
          console.log("case 2")
          this.closeBook(true);
          this.paper1.classList.remove("flipped");
          this.paper1.style.zIndex = '3';
          break;
        case 3:
          console.log("case 2")
          this.paper2.classList.remove("flipped");
          this.paper2.style.zIndex = '2';
          break;
        case 4:
          console.log("case 4")
          this.openBook();
          this.paper3.classList.remove("flipped");
          this.paper3.style.zIndex = '1';
          break;
        default:
          throw new Error("unkown state");
      }

      this.currentLocation--;
    }
  }

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.book = this.book.nativeElement;
    this.prevBtn = this.prevBtn.nativeElement;
    this.nextBtn = this.nextBtn.nativeElement;
    this.paper1 = this.paper1.nativeElement;
    this.paper2 = this.paper2.nativeElement;
    this.paper3 = this.paper3.nativeElement;
  }

}
