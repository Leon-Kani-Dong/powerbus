import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CodeServiceProvider } from '../../providers/code-service/code-service';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  constructor( public loadingCtrl: LoadingController,public storage: Storage,private nav: NavController, private auth: AuthServiceProvider, private code:CodeServiceProvider,private alertCtrl: AlertController,) { }
  codeButton : any;
  responseData : any;
  userData = {"password": "", "email": "","country":"+61"};
  mobile={"mobile":""};
  codeButtonValue='verified code'
  maxTime: any=60
  timer: any;
  ionViewDidLoad() {
 

    this.storage.get('powerbusToken').then((token) => {

        if(typeof(token) == 'string'){
            // console.log(typeof(token))
            console.log(token);
            var data=JSON.parse(token)
            this.auth.postData(data,'api-token-refresh/').then((result) => {
              this.responseData = result;
              if(this.responseData){
                console.log(typeof(JSON.stringify(this.responseData)))
               this.storage.set('powerbusToken', JSON.stringify(this.responseData));
               this.nav.setRoot(HomePage);
              }
              else{ console.log("no "); }
            }, (err) => {
              // Error log
            });

            //this.nav.setRoot(HomePage);

        } else {

            // this.loading.dismiss();

        }

    });

}

  StartTimer(){
    this.timer = setTimeout(x => 
      {   this.loading.dismiss();
          if(this.maxTime <= 0) { }
          this.maxTime -= 1;
          
          if(this.maxTime>0){
            this.codeButton= true;
            this.codeButtonValue=this.maxTime;
            this.StartTimer();
          }
          
          else{
            this.maxTime=60;
            this.codeButtonValue='verified code'
              this.codeButton = false;
          }

      }, 1000);
 

  }
  createCode(){
    this.showLoader('Sending...');
    this.StartTimer();
    this.code.createCode({"mobile":this.userData.country+this.userData.email}).subscribe(
    val => {
        console.log(val);
        if (val==undefined){
          this.loading.dismiss();
          alert('cannot send sms,please try again!')
          
          this.maxTime = -1;
        }
      });
 
    
  
  }
  login(){
    this.showLoader('Loging...');
    var data = {"password": "", "email": "","country":"+61"};
    data.email=this.userData.country+this.userData.email
    data.password=this.userData.password
    this.auth.postData(data,'api-token-auth/').then((result) => {
     this.responseData = result;
     if(this.responseData){
       console.log(typeof(JSON.stringify(this.responseData)))
      this.storage.set('powerbusToken', JSON.stringify(this.responseData));
      this.loading.dismiss();
      this.nav.setRoot(HomePage);
     }
     else{ console.log("User already exists"); }
   }, (err) => {
     // Error log
   });
  
  // public login() {
  //   this.showLoading()
  //   this.auth.login(this.registerCredentials).subscribe(allowed => {
  //     if (allowed) {        
  //       this.nav.push(HomePage);
  //     } else {
  //       this.showError("Access Denied");
  //     }
  //   },
  //     error => {
  //       this.showError(error);
  //     });
  // }
 
  }
  showLoader(words){
 
    this.loading = this.loadingCtrl.create({
        content: words
    });

    this.loading.present();

}
}




