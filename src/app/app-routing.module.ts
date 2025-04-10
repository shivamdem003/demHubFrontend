import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponentComponent } from './components/show-list-component/show-list-component.component';
import { SeasonViewerComponentComponent } from './components/season-viewer-component/season-viewer-component.component';

const routes: Routes = [
  { path: '', component: ShowListComponentComponent },
  { path: 'show/:encodedPath', component: SeasonViewerComponentComponent },
  { path: '**', redirectTo: '' } // wildcard fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
