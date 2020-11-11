import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: 'presentation', component: PresentationComponent },
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'game', component: GameComponent },
  { path: '', redirectTo: 'game', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
