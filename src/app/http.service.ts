import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface FlickrPhoto {
 farm:string;
 id:string;
 secret:string;
 server:string;
 title:string;
}

export interface FlickrOutput{
  photos:{
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  search_keyword(keyword:string){
    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c1cf4c4d5fe283be9162eb56bae31a9&text=airport&per_page=10&page=1&format=json&nojsoncallback=1';
    const params =`api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12`;

    return this.http.get(url+params).pipe(map((FlickrOutput: any)=>{
      const urlArray: any[] = [];
      FlickrOutput.photos.photo.forEach((ph :FlickrPhoto)=>{
        const photoObj ={
          // http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
          url:`https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg `,
          title:ph.title
          
        };
        urlArray.push(photoObj);
      });
      return urlArray;
     
    }));
  }
  
}
function res(res: any, arg1: (FlickrOutput: any) => any[]): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}

