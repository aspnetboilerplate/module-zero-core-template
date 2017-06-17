import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent
{
  id: string = "";
  route: ActivatedRoute;

  constructor(route: ActivatedRoute) {
    this.route = route;
    this.id = this.route.snapshot.params.id;

    console.log("In Construct. routerid:"+this.id);  

    this.route.params.subscribe(
      params => {
        console.log("Param change", params)
        this.id = params.id;
      }
    );
  }
}