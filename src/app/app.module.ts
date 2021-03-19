import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './components/game/game.component';
import { NodeComponent } from './components/node/node.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarComponent,
    BoardComponent,
    GameComponent,
    NodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    RadioButtonModule,
    SelectButtonModule,
    SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
