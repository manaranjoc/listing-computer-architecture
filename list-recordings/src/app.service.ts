import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
const jwt = require('jsonwebtoken');
import { map } from 'rxjs/operators'

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {}

  
  getRecordings(month: number){  
    const apiKey = this.configService.get<string>('API_USER');
    const apiPass = this.configService.get<string>('API_TOKEN');

    const year = 2020;
    const nextMonth = this.obtainNextMonth(month);
    const nextYear = this.obtainProperYear(nextMonth);
    
    const payload = {
      iss: apiKey,
      exp: ((new Date()).getTime() + 5000)
    };

    const token = jwt.sign(payload, apiPass);

    const config = {
      headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      params: {
        'page_size': 50,
        'from': `${year}-${month}-01`,
        'to': `${nextYear}-${nextMonth}-01`
      }
    };

    return this.httpService.get('https://api.zoom.us/v2/users/angel.naranjo@udea.edu.co/recordings',config)
    .pipe(
      map(response => response.data)
    );
  }

  obtainNextMonth(month): number{
    let nextMonth = month + 1;
    if (nextMonth == 13) {
      nextMonth = 1;
    }
    return nextMonth;
  }

  obtainProperYear(nextMonth): number{
    let properYear = 2020;
    if (nextMonth == 1) {
      properYear = 2021;
    }
    return properYear;
  }
} 