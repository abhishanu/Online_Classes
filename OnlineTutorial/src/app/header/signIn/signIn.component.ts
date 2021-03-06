import { Component,OnInit } from '@angular/core';
import {DataParserService} from '../../services/dataParser.service';
import{SessionStorageService} from '../../services/sessionMaintain.service';
import{ValidationService} from '../../services/validation.service';
import {ResetPassword} from './reset-password/reset_password.component';
import { FormsModule }   from '@angular/forms';

declare var $: any;
@Component({
  selector: 'signInPopUP',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignIn implements OnInit {
 private email:any;
 private pwd:any;
 public status:any;
 public isSignInChecked:boolean;
 
 constructor(private _dataParserService: DataParserService,private _sessionStorage:SessionStorageService,private _validator: ValidationService) {}

 ngOnInit(){ 
   this.email=this._sessionStorage.getRememberUserName();
 }
 
 private checkSignIn(){
   var that=this;
   var validateMail:boolean=this._validator.validateMailId();
   if(validateMail){
       $('.error').text('');
      var localData;
      this._dataParserService.SignIn(this.email,this.pwd)
                          .subscribe(data=>{
                                          localData=data;
                                          //console.log(localData.Name);
                                            if(localData == "-1")
                                            {
                                              
                                            }
                                            else
                                            {
                                                this._dataParserService.authorized=true;
                                                //this._dataParserService.username=this.status;
                                                this._sessionStorage.setUsername(localData.Name);
                                                this._sessionStorage.setUserEmail(localData.Email);
                                                this._sessionStorage.setUserContact(localData.Contact);
                                                this._sessionStorage.setUserId(localData.Id);
                                                if(this.isSignInChecked){
                                                  this._sessionStorage.setRememberUserName(localData.Email);
                                                }
                                                else{
                                                  this._sessionStorage.rememberMeFalse();
                                                }
                                                this.Close();
                                            }
                                          },
                                    error=>alert("error"),
                                    ()=>console.log('finish')
                                    );

   }
    
   else{
     $('.error').text("Please Enter a valid mail id")
                .css("color", "red");
   }
  }

 private forgetPassword(){
   this._dataParserService.ForgetPwd=true;
   this.Close();
 }

 private rememberMe(){
   this.isSignInChecked=!(this.isSignInChecked);
 }
 private Close(){
   this._dataParserService.signIn=false;
 }
}
