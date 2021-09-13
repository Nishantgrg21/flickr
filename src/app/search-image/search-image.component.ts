import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {
 images :any= [];
 keyword!: string;
 
  constructor( private httpService: HttpService) { }

  ngOnInit(): void {
  }

  search(event:any){
    this.keyword =event.target.value.toLowerCase();
    if(this.keyword && this.keyword.length>0){
      this.httpService.search_keyword(this.keyword)
      .toPromise()
      .then(res =>{
        this.images =res;
      });
    }
  }

}
