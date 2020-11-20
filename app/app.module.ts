import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { GridContextMenuComponent } from './grid-context-menu.component';

import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, GridModule, PopupModule ],
  declarations: [ AppComponent, GridContextMenuComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
