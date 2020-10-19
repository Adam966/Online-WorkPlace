import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  changeToolbar = true;
  isLoading = false;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard'], {relativeTo: this.route});
  }

}
