import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';
/**
 * Generated class for the PopoverShopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-shop',
  templateUrl: 'popover-shop.html'
})
export class PopoverShopComponent {

  item:any
  constructor(public navParams:NavParams) {
    this.item= this.navParams.data;
  }

}
