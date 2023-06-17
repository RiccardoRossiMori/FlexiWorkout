import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedaAttivaPage } from './scheda-attiva.page';

describe('SchedaAttivaPage', () => {
  let component: SchedaAttivaPage;
  let fixture: ComponentFixture<SchedaAttivaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SchedaAttivaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
