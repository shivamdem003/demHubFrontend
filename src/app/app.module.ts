import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoBrowserComponent } from './components/video-browser/video-browser.component';
import { ShowListComponentComponent } from './components/show-list-component/show-list-component.component';
import { SeasonViewerComponentComponent } from './components/season-viewer-component/season-viewer-component.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent,
    VideoBrowserComponent,
    ShowListComponentComponent,
    SeasonViewerComponentComponent,
    HeaderComponent,
    FooterComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule  
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
