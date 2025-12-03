import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderList } from './header-list';

describe('HeaderList', () => {
  let component: HeaderList;
  let fixture: ComponentFixture<HeaderList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
