import { Component, OnInit } from '@angular/core';
import {Name}from '../name';
import {NameData } from '../nameData';
import { NameServiceService } from '../name-service.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {
  names : Name[];
  
  constructor(private NameService: NameServiceService) { }

  ngOnInit() {
    this.getNames();
  }

  getNames(): void {
    this.NameService.getNames()
    .subscribe(names => this.names = names);
  }
  add(name: string): void {
    name = name.trim();
    if(!name) {
      return ;
    }
    this.NameService.addName({name} as Name)
    .subscribe(name =>{
      this.names.push(name)
    })
  }
  delete(name: Name): void{
    this.names = this.names.filter(h => h !== name);
    this.NameService.deleteName(name).subscribe();
  }
}
