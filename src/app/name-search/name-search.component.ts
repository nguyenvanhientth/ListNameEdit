import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Name } from '../name';
import { NameServiceService } from '../name-service.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/Operators';

@Component({
  selector: 'app-name-search',
  templateUrl: './name-search.component.html',
  styleUrls: ['./name-search.component.css']
})
export class NameSearchComponent implements OnInit {

  names$: Observable<Name[]>;
  private searchTerms = new Subject<string>();

  constructor(private nameService: NameServiceService) { }

  //PUSH  a search term into the observable stream
  search(term:string):void {
    this.searchTerms.next(term);
  }

  ngOnInit():void {
    this.names$ = this.searchTerms.pipe(
      // wait 300ms adter each keystroke before considering the term
      debounceTime(300),

      //ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.nameService.searchName(term)),
    );
  }

}
