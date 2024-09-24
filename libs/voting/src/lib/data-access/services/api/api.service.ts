import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../../../util/models/voting-models';

const config = {
  voterApi: 'http://localhost:5046/api/voter',
  candidateApi: 'http://localhost:5046/api/candidate',
  api: 'http://localhost:5046/api'
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getAll = <T extends Person>(route: string): Observable<T[]> => this.http.get<T[]>(`${config.api}/${route}`);

  public getById = <T extends Person>(id: number, route: string): Observable<T> =>
    this.http.get<T>(`${config.api}/${route}/${id}`);

  public create = <T extends Person>(person: T, route: string): Observable<T> =>
    this.http.post<T>(`${config.api}/${route}`, person);

  public update = <T extends Person>(id: number, person: T, route: string): Observable<void> =>
    this.http.put<void>(`${config.api}/${route}/${id}`, person);

  public delete = (id: number, route: string): Observable<void> =>
    this.http.delete<void>(`${config.api}/${route}/${id}`);
}
