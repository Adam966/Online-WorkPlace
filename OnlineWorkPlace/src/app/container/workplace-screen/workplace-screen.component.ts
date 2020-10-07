import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workplace-screen',
  templateUrl: './workplace-screen.component.html',
  styleUrls: ['./workplace-screen.component.css']
})
export class WorkplaceScreenComponent implements OnInit {
  workPlaceElements: { title: string, content: string }[] = [
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis.'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis.'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis.'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis.'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna porttitor erat, et feugiat libero nisi a turpis. Sed porttitor rhoncus enim eget lacinia. Ut ac'},
    {title: 'title text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum libero. Phasellus malesuada mattis urna, ac accumsan ex. Nullam consequat, urna non blandit lobortis, tortor magna'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
