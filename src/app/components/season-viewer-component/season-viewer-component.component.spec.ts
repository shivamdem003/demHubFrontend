import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonViewerComponentComponent } from './season-viewer-component.component';

describe('SeasonViewerComponentComponent', () => {
  let component: SeasonViewerComponentComponent;
  let fixture: ComponentFixture<SeasonViewerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeasonViewerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonViewerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
