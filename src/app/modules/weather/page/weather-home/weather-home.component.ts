import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from 'src/app/models/interfaces/weather.interface';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})

export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  initialCity = 'São Paulo';
  weatherData = {} as WeatherData;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.initialCity);
  }

  getWeatherData(city: string) {
    this.weatherService
      .getWeatherData(city)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.weatherData = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onSubmit() {
    this.getWeatherData(this.initialCity);
    this.initialCity = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
