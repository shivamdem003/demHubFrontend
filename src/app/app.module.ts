import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoBrowserComponent } from './components/video-browser/video-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent,
    VideoBrowserComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
