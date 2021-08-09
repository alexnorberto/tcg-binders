import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';



@Component({
  selector: 'app-binder-book',
  templateUrl: './binder-book.component.html',
  styleUrls: ['./binder-book.component.css']
})
export class BinderBookComponent implements OnInit, AfterViewInit {

  //Number of papers
  @Input() numberOfPapers = [1,2,3];

  // References to DOM Elements
   @ViewChild('prevBtn') prevBtn;
  @ViewChild('nextBtn') nextBtn;
  @ViewChild('book') book;

  @ViewChildren('paper',  { read: ViewContainerRef }) papersRef: QueryList<ViewContainerRef>;


// Business Logic
  currentLocation = 0;
  numOfPapers = 3;
  maxLocation = this.numOfPapers + 2;

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
    if(this.currentLocation < this.maxLocation) {

      let paper = document.getElementById('p'+this.currentLocation);
      paper.classList.add("flipped");
      paper.style.zIndex = (this.currentLocation).toString();

      if (this.currentLocation > 0) {
        let paperBefore = document.getElementById('p'+(this.currentLocation-1).toString());
        paperBefore.style.zIndex = (this.currentLocation-1).toString();
      }

      if (this.currentLocation < this.maxLocation) {
        let paperAfter = document.getElementById('p' + (this.currentLocation + 1).toString());
        paperAfter.style.zIndex = (this.maxLocation).toString();
      }

      if(this.currentLocation == 0){
         this.openBook();
      }

      if(this.maxLocation - this.currentLocation == 1) {
        this.closeBook(false);
      }

      this.currentLocation++;
    }
  }

  goPrevPage() {
    if(this.currentLocation > 0) {

      let paper = document.getElementById('p'+(this.currentLocation-1).toString());
      paper.classList.remove("flipped");
      paper.style.zIndex = (this.maxLocation - this.currentLocation).toString();


      if(this.currentLocation == this.maxLocation){
        this.openBook();
      }

      if(this.currentLocation == 1) {
        this.closeBook(true);
      }

      this.currentLocation--;
    }
  }

  constructor() {
    this.papers = new Array(this.numOfPapers);
  }

  ngOnInit(): void {

  }
  papers = [];
  ngAfterViewInit() {

    this.papersRef.forEach((paper,i) => {
      console.log(paper.element)
      this.papers[i] = paper.element.nativeElement;
    });

    console.log('this papers',this.papers)
    this.book = this.book.nativeElement;
    this.prevBtn = this.prevBtn.nativeElement;
    this.nextBtn = this.nextBtn.nativeElement;
  }

}
