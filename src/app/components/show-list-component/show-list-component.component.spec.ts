import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListComponentComponent } from './show-list-component.component';

describe('ShowListComponentComponent', () => {
  let component: ShowListComponentComponent;
  let fixture: ComponentFixture<ShowListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
