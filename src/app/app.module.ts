import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppComponent } from './app.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ModalComponent } from './modal/modal.component';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';



@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    NgbModule,
    NgbCarouselModule,
    FormsModule,
    SwiperModule,
    IvyCarouselModule,
    ReactiveFormsModule
  ],
  providers: [
    ChatService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
