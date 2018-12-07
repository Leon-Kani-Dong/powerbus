import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment,
  LatLng,
} from '@ionic-native/google-maps';
// import {Subject} from 'rxjs/Subject'
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
//   @ViewChild('map') mapElement: ElementRef;
//   private map:GoogleMap;


//   constructor(
//               private platform: Platform,
//               private googleMaps: GoogleMaps) {
   
//  }
//  ngAfterViewInit() {
//     this.initMap();

// }
// initMap() {
//   let mapOptions: GoogleMapOptions = {
//     camera: {
//        target: {
//          lat: 43.0741904,
//          lng: -89.3809802
//        },
//        zoom: 18,
//        tilt: 30
//      }
//   };
//   this.map = GoogleMaps.create('map_canvas', mapOptions);

// }
// mapReady: boolean = false;
//   map: GoogleMap;
//   @ViewChild('map') mapElement: ElementRef;
//   constructor() {
//   }
//   ionViewDidLoad() {
//     this.loadMap();
//   }

//   loadMap() {
//     let element = this.mapElement.nativeElement;
   
 
//     Environment.setEnv({
//       'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://`)',
//       'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://`)'
//     });
//     //this.map = GoogleMaps.create('map_canvas');
//     this.map = GoogleMaps.create(element);
//   }

@ViewChild('map') mapElement: ElementRef;
map: GoogleMap;
constructor(public navCtrl: NavController, public navParams: NavParams, private _googleMaps: GoogleMaps) {
}

ngAfterViewInit() {
  console.log('ngAfterViewInit');
  this.initMap();
}

initMap() {    
  let element = this.mapElement.nativeElement;
  this.map = GoogleMaps.create(element, {});//this._googleMaps.create(element);


  // Wait the MAP_READY before using any methods.
  this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    console.log('Map is ready!');

  }).catch( err =>{
    console.error("Error maperino --> "+err);
  });
}

moveCamera(location: LatLng) {
  let options = {
    target: location,
    zoom: 18,
    tilt: 30
  }

  this.map.moveCamera(options);
}


}

