
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ShopPage } from '../pages/shop/shop';
import { MapPage } from '../pages/map/map';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CodeServiceProvider } from '../providers/code-service/code-service';
import { HttpClientModule } from '@angular/common/http'; 
import { Geolocation } from '@ionic-native/geolocation';
import { ShopServiceProvider } from '../providers/shop-service/shop-service';
import {PopoverShopComponent} from '../components/popover-shop/popover-shop';
import { IonicStorageModule } from '@ionic/storage';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { CallNumber } from '@ionic-native/call-number';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ShopPage,
    MapPage,
    PopoverShopComponent
  ],
  imports: [
    BrowserModule,HttpModule ,HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ShopPage,
    MapPage,
    PopoverShopComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    CodeServiceProvider,
    Geolocation,
    GoogleMaps,
    ShopServiceProvider,
    Diagnostic,
    OpenNativeSettings,
    LocationAccuracy,
    CallNumber
  ]
})
export class AppModule {}
