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
     let status:any;
      this._dataParserService.SignUp(this.name,this.email,this.phone,this.pwd)
      .subscribe(data=>{
                        status=data;
                        if(status=="success"){
                          this.Close();
                        }
                      },
                 error=>alert("error"),
                 ()=>console.log('finish')
                );
   }
  private Close(){
    this._dataParserService.signUp=false;
  }
}
