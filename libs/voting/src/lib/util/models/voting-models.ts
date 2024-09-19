export interface Person {
  id?: number;
  name: string;
}

export interface Voter extends Person {
  voted: boolean;
}

export interface Candidate extends Person {
  votes: number;
}
