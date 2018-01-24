import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { DebugElement } from '@angular/core/src/debug/debug_node';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElem: DebugElement;
  let nativeElem: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component.', () => {
    expect(component).toBeTruthy();
  });

  it('should contain default text of Hello World 1.0', () => {
    debugElem = fixture.debugElement.query(By.css('h2'));
    expect(debugElem.nativeElement.textContent).toEqual('Hello World 1.0');
  });

  it('should change the text to Hello World 1.56', () => {
    // Arrange
    component.version = 1.56;

    // Act
    fixture.detectChanges();

    debugElem = fixture.debugElement.query(By.css('h2'));
    // Assert
    expect(debugElem.nativeElement.textContent).toEqual('Hello World 1.56');
  });

  it('should have default color of blue for Hello World text.', () => {
    debugElem = fixture.debugElement.query(By.css('h2'));
    expect(debugElem.nativeElement.style.color).toEqual('blue');
  });

  it('should change color to red for Hello World text when change color button is clicked.', () => {
    spyOn(component, 'toggleColor').and.callThrough();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();
    debugElem = fixture.debugElement.query(By.css('h2'));

    expect(debugElem.nativeElement.style.color).toEqual('red');
    expect(component.toggleColor).toHaveBeenCalled();
    expect(component.color).toEqual('red');
  });

  it('should keep input and hello world version text in sync - two way binding.', async(() => {
    debugElem = fixture.debugElement.query(By.css('input'));
    nativeElem = debugElem.nativeElement;
    nativeElem.value = 4.0;

    nativeElem.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const h2debugElem = fixture.debugElement.query(By.css('h2'));

      expect(h2debugElem.nativeElement.textContent).toEqual('Hello World 4.0');
      expect(component.version).toEqual(4.0);
    });
  }));

});
