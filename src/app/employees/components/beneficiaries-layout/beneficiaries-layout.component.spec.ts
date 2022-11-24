import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesLayoutComponent } from './beneficiaries-layout.component';

describe('BeneficiariesLayoutComponent', () => {
  let component: BeneficiariesLayoutComponent;
  let fixture: ComponentFixture<BeneficiariesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiariesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
