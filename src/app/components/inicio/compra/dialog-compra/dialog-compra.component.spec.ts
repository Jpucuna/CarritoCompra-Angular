import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompraComponent } from './dialog-compra.component';

describe('DialogCompraComponent', () => {
  let component: DialogCompraComponent;
  let fixture: ComponentFixture<DialogCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
