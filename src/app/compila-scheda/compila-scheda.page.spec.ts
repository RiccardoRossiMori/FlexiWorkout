import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompilaSchedaPage } from './compila-scheda.page';

describe('CompilaSchedaPage', () => {
  let component: CompilaSchedaPage;
  let fixture: ComponentFixture<CompilaSchedaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompilaSchedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
