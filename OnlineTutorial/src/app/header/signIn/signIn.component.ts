import { Component,OnInit } from '@angular/core';
import {DataParserService} from '../../services/dataParser.service';
import{SessionStorageService} from '../../services/sessionMaintain.service';
import {ResetPassword} from './reset-password/reset_password.component';
import { FormsModule }   from '@angular/forms';

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
 
 constructor(private _dataParserService: DataParserService,private _sessionStorage:SessionStorageService) {}

 ngOnInit(){ 
   this.email=this._sessionStorage.getRememberUserName();
 }
 
 private checkSignIn(){
   var that=this;
   
   this._dataParserService.SignIn(this.email,this.pwd)
                      .subscribe(data=>{
                                        this.status=data;
                                        if(this.status!="User"){
                                            this._dataParserService.authorized=true;
                                            //this._dataParserService.username=this.status;
                                            this._sessionStorage.setUsername(this.status);
                                            if(this.isSignInChecked){
                                              this._sessionStorage.setRememberUserName(that.email);
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
