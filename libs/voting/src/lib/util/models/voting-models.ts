export interface Person {
  id?: number;
  name: string;
}

export interface Voter extends Person {
  voted: boolean;
}

export interface Candicate {
  votes: number[];
}
