import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  // Fix cache map types to store the actual data
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();
  private queryCacheAlpha = new Map<string, Country>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log('No estaba en cache');

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((countries) => CountryMapper.mapCountryListFromRestCountriesArray(countries)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        console.error('Error:', error);
        return throwError(()=> new Error(`No se pudo obtener capitales con ese query ${query}`));
      }));
  }

  searchByCountry(query: string): Observable<Country[]> {
    const lowerQuery = query.toLowerCase();

    if (this.queryCacheCountry.has(lowerQuery)) {
      return of(this.queryCacheCountry.get(lowerQuery) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerQuery}`)
    .pipe(
      map((countries) => CountryMapper.mapCountryListFromRestCountriesArray(countries)),
      tap(countries => this.queryCacheCountry.set(lowerQuery, countries)),
      catchError(error => {
        console.error('Error:', error);
        return throwError(()=> new Error(`No se pudo obtener capitales con ese query ${query}`));
      }));
  }

  searchByAlphaCode(code: string): Observable<Country | undefined> {
    code = code.toLowerCase();

    if (this.queryCacheAlpha.has(code)) {
      return of(this.queryCacheAlpha.get(code));
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map((countries) => CountryMapper.mapCountryListFromRestCountriesArray(countries)),
      map((countries) => countries.at(0)),
      tap(country => {
        if (country) this.queryCacheAlpha.set(code, country);
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(()=> new Error(`No se pudo obtener paises con ese codigo ${code}`));
      }));
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapCountryListFromRestCountriesArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log('Error fetching ', error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${region}`)
        );
      })
    );
  }
}
