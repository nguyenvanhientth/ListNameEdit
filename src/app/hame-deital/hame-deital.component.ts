import { Component, OnInit, Input } from '@angular/core';
import { Name } from '../name';
import { ActivatedRoute } from '@angular/router';
import { NameServiceService } from '../name-service.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-hame-deital',
  templateUrl: './hame-deital.component.html',
  styleUrls: ['./hame-deital.component.css']
})
export class HameDeitalComponent implements OnInit {
  @Input() name: Name;
  constructor(
    private route: ActivatedRoute,
    private nameService: NameServiceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getName();
  }

  getName(): void {
    const id =+this.route.snapshot.paramMap.get('id');
    this.nameService.getName(id)
    .subscribe(name => this.name = name);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.nameService.updateName(this.name)
    .subscribe(() => this.goBack());
  }
}
