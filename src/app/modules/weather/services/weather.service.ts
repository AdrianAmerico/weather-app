import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/models/interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = ''; // Add your OpenWeatherMap API key here

  constructor(private httpService: HttpClient) {}

  getWeatherData(city: string): Observable<WeatherData> {
    return this.httpService.get<WeatherData>(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          mode: 'json',
        },
      }
    );
  }
}
