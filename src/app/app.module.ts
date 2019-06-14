import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import { HtmlheadService } from '../providers/seo/seo';


// import pagination component

import { PaginationModule } from "ng2-bootstrap/pagination";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(),
	AgmCoreModule.forRoot(),
    AppRoutingModule,
	InfiniteScrollModule,
	ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
	PaginationModule.forRoot(),
	HttpModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	{provide: LocationStrategy, useClass: PathLocationStrategy},
	HtmlheadService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
