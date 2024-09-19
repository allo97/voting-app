import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate, Voter } from '../../../util/models/voting-models';

const config = {
  voterApi: 'http://localhost:5046/api/voter',
  candidateApi: 'http://localhost:5046/api/candidate'
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getAllVoters = (): Observable<Voter[]> => this.http.get<Voter[]>(`${config.voterApi}`);

  public getVoterById = (id: string): Observable<Voter> => this.http.get<Voter>(`${config.voterApi}/${id}`);

  public getAllCandidates = (): Observable<Candidate[]> => this.http.get<Candidate[]>(`${config.candidateApi}`);

  public getCandidateById = (id: string): Observable<Candidate> =>
    this.http.get<Candidate>(`${config.candidateApi}/${id}`);
}
