import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShopPage } from '../../pages/shop/shop';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AlertController } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public storage: Storage,private callNumber: CallNumber,private openNativeSettings :OpenNativeSettings ,public alertCtrl: AlertController,private locationAccuracy:LocationAccuracy,public nav: NavController,private diagnostic: Diagnostic,
    public platform: Platform) {
      
  }
  logout(){
    this.storage.remove('powerbusToken');
    this.nav.setRoot(LoginPage);

  }

  call(){
    this.callNumber.isCallSupported()
.then(function (response) {
    if (response == true) {
        // do something
        this.callNumber.callNumber("18001010101", true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
    else {
       alert('Device does not support dialer')
    }
});
   
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Enable GPS Services?',
      message: 'Do you want to enable GPS services ?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.open('location');
          }
        }
      ]
    });
    confirm.present();
  }

  navigate(){
    this.nav.push(ShopPage);
  }

  ionViewDidLoad() {
    //  this.checkLocation();
    
    console.log('ionViewDidLoad ShopPage');

  }
  checkLocation()
  {
  this.platform.ready().then((readySource) => {
  
  this.diagnostic.isLocationEnabled().then(
  (isAvailable) => {
    if (isAvailable==false){
      this.showConfirm();
      this.openLocation()
    }
  }).catch( (e) => {
  alert(JSON.stringify(e));
  });
  
  
  });
  }

  openLocation(){
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });

    

  }

  open(setting:string){
    this.openNativeSettings.open(setting).then(
      val =>{
        // alert(setting);
      }
    ).catch(
      err =>{
        alert(JSON.stringify(err))
      }
    )
  }
}
