import { Component, OnInit } from '@angular/core';
import { Name } from '../name';
import { NameServiceService } from '../name-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  names: Name[] =[];

  constructor(private nameService: NameServiceService) { }

  ngOnInit() {
    this.getNames();
  }

  getNames(): void{
    this.nameService.getNames()
    .subscribe(name => this.names = name.slice(1,5));
  }

}
