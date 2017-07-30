import { Component } from '@angular/core';
import {DataParserService} from '../../services/dataParser.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUp {
  private name:string;
  private email:any;
  private pwd:any;
  private phone:Number;
  private _otp:Number;
  
   constructor(private _dataParserService: DataParserService) {} 

   private SubmitForm(){
      this._dataParserService.SignUp(this.name,this.email,this.phone,this.pwd);
   }
  private Close(){
    this._dataParserService.signUp=false;
  }
 
}
