import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { ShopServiceProvider } from '../../providers/shop-service/shop-service'
import { PopoverController } from 'ionic-angular'
import {PopoverShopComponent} from '../../components/popover-shop/popover-shop';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})

export class ShopPage {
  loading: any;
  options : GeolocationOptions;
  currentPos : Geoposition;
  shops:any;
  constructor(private locationAccuracy:LocationAccuracy,private openNativeSettings :OpenNativeSettings ,private diagnostic: Diagnostic,
    public platform: Platform,public loadingCtrl: LoadingController,public popoverCtrl: PopoverController,public shopProvider:ShopServiceProvider,public geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams) {
    this.getShops();
    // this.getUserPosition()
  }
  checkLocation()
  {
  this.platform.ready().then((readySource) => {
  
  this.diagnostic.isLocationEnabled().then(
  (isAvailable) => {
    if (isAvailable==false){
      // alert('111111')
      // this.open('location')
      this.locationAccuracy.request(1)
    }
  }).catch( (e) => {
  alert(JSON.stringify(e));
  });
  
  
  });
  }
  openLocation(){
    this.locationAccuracy.request(1).then(
      val =>{
        this.getUserPosition()
      }
    )

  }
  open(setting:string){
    this.openNativeSettings.open(setting).then(
      val =>{
        alert(setting);
      }
    ).catch(
      err =>{
        alert(JSON.stringify(err))
      }
    )
  }
  presentPopover(myEvent,item) {
    let popover = this.popoverCtrl.create(PopoverShopComponent, item);
    popover.present({
      ev: myEvent
    });
  }
  detail(item){
    alert(item.name)
  }
  getShops() {
    this.shopProvider.getShops()
    .then(data => {
      this.loading.dismiss();
    this.shops = data;
    this.getUserPosition()
      
      //console.log(this.shops);
    });
  }
  getUserPosition(){
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos; 
        this.shops.map((shop)=>{
          shop.distance=this.calculateDistance(shop.Latitude,shop.longitude)

        })
        this.shops.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
      });

        console.log(pos.coords.latitude);

    },(err : PositionError)=>{

        console.log("error : " + err.message);
    });
}
  ionViewDidLoad() {
    this.checkLocation();
    this.showLoader();
    console.log('ionViewDidLoad ShopPage');

  }
  calculateDistance(lat1:number,long1:number){
    let lat2=this.currentPos.coords.latitude
    let long2=this.currentPos.coords.longitude
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return Number(Math.round(dis * 100) / 100).toFixed(2);
  }
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
        content: 'Loading...'
    });

    this.loading.present();

}
}
