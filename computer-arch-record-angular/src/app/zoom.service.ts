import { Injectable } from '@angular/core';
import { UserRecording } from './model/user-recording.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Month } from './model/month.model'
import { Months } from './model/months.model';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  userRecording: UserRecording;
  currentMonth: number = new Date().getMonth() +1;

  constructor(private http: HttpClient) { }

  getUserRecording(monthToRetrieve: number): Observable<UserRecording> {
    if(monthToRetrieve === Month.NEXT){
      this.currentMonth += 1;
    }else if(monthToRetrieve === Month.PREVIOUS){
      this.currentMonth -= 1;
    }
    
    if(this.currentMonth === 13){
      this.currentMonth = 1;
    }else if(this.currentMonth === 0){
      this.currentMonth = 12;
    }
   return  this.http.get<UserRecording>('https://computer-architecture.herokuapp.com/'+this.currentMonth);
  }

  getCurrentMonth(): string{
    return Months[this.currentMonth];
  }
}
