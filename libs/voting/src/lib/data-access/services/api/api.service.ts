import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voter } from '../../../util/models/voting-models';
import { Candidate } from './../../../util/models/voting-models';

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

  public getVoterById = (id: number): Observable<Voter> => this.http.get<Voter>(`${config.voterApi}/${id}`);

  public createVoter = (voter: Voter): Observable<Voter> => this.http.post<Voter>(`${config.voterApi}`, voter);

  public updateVoter = (id: number, voter: Voter): Observable<void> =>
    this.http.put<void>(`${config.voterApi}/${id}`, voter);

  public deleteVoter = (id: number): Observable<void> => this.http.delete<void>(`${config.voterApi}/${id}`);

  public getAllCandidates = (): Observable<Candidate[]> => this.http.get<Candidate[]>(`${config.candidateApi}`);

  public getCandidateById = (id: string): Observable<Candidate> =>
    this.http.get<Candidate>(`${config.candidateApi}/${id}`);

  public createCandidate = (candidate: Candidate): Observable<Candidate> =>
    this.http.post<Candidate>(`${config.candidateApi}`, candidate);
}
