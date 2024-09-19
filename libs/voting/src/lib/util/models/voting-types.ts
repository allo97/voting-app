import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type VotersForm = FormArray<
  FormGroup<{
    voted: FormControl<boolean>;
    id?: FormControl<number | undefined> | undefined;
    name: FormControl<string>;
  }>
>;

export type CandidatesForm = FormArray<
  FormGroup<{
    votes: FormControl<number>;
    id?: FormControl<number | undefined> | undefined;
    name: FormControl<string>;
  }>
>;

export type ElectionParticipantsForm = FormGroup<{
  voters: VotersForm;
  candidates: CandidatesForm;
}>;
