import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingContainerComponent } from './voting-container.component';

describe('VotingComponent', () => {
  let component: VotingContainerComponent;
  let fixture: ComponentFixture<VotingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingContainerComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(VotingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
