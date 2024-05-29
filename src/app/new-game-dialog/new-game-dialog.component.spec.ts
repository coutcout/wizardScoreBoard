import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NewGameDialogComponent } from './new-game-dialog.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { InteractivityChecker } from '@angular/cdk/a11y';

describe('NewGameDialogComponent', () => {
  let component: NewGameDialogComponent;
  let fixture: ComponentFixture<NewGameDialogComponent>;
  let debugElement: DebugElement;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<NewGameDialogComponent, Boolean>>;

  beforeEach(async () => {

    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    
    await TestBed.configureTestingModule({
      imports: [NewGameDialogComponent],
      providers:[
        {
          provide: MatDialogRef, useValue:  mockMatDialogRef
        },
        {
          provide: InteractivityChecker, useValue: {isFocusable: () => true}
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewGameDialogComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have the good title', () => {
    fixture.detectChanges();
    let title = debugElement.query(By.css("h2"));

    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toEqual(component.title);
  });

  it('should have the good text', () => {
    fixture.detectChanges();
    let title = debugElement.query(By.css("mat-dialog-content"));

    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toEqual(component.warningText);
  });

  it('should have a yes button', () => {
    // Arrange
    fixture.detectChanges();
    let yesButton = debugElement.query(By.css("button.confirm"));
    
    // Act
    expect(yesButton).toBeTruthy();
    expect(yesButton.nativeElement.textContent).toEqual('Yes');
  });

  it('should have a no button', () => {
    // Arrange
    fixture.detectChanges();
    let noButton = debugElement.query(By.css("button.cancel"));
    
    // Act
    expect(noButton).toBeTruthy();
    expect(noButton.nativeElement.textContent).toEqual('No');
  });

  it('no button should be the focus one', fakeAsync(() => {
    // Arrange
    let noButton = debugElement.query(By.css("button.cancel"));
    fixture.detectChanges();
    tick();

    // Act
    expect(document.activeElement).toEqual(noButton.nativeElement);
  }));

  it('should send false when no button is clicked', () => {
    // Arrange
    let noButton = debugElement.query(By.css("button.cancel"));
    fixture.detectChanges();
    
    // Act
    noButton.nativeElement.click();
    fixture.detectChanges();

    // Assert
    expect(mockMatDialogRef.close).toHaveBeenCalledOnceWith(false);
  });

  it('should send true when yes button is clicked', () => {
    // Arrange
    let yesButton = debugElement.query(By.css("button.confirm"));
    fixture.detectChanges();
    
    // Act
    yesButton.nativeElement.click();
    fixture.detectChanges();

    // Assert
    expect(mockMatDialogRef.close).toHaveBeenCalledOnceWith(true);
  });
});
