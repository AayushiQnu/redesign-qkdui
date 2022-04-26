import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPSK } from './addpsk.component';

describe('AddPSK', () => {
  let component: AddPSK;
  let fixture: ComponentFixture<AddPSK>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPSK ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPSK);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
