import { Component,OnInit } from '@angular/core';
import {DataParserService} from '../../services/dataParser.service';
import{SessionStorageService} from '../../services/sessionMaintain.service';
import {ForgetPassword} from './forget-password/forget_password.component';
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
 
 
 constructor(private _dataParserService: DataParserService,private _sessionStorage:SessionStorageService) {}

 ngOnInit(){ }
 
 private checkSignIn(){
   let checkBox:any;
   checkBox =document.getElementById("checkbox");
   //checkBox.checked;
   
   this._dataParserService.SignIn(this.email,this.pwd)
                      .subscribe(data=>{
                                        this.status=data;
                                        if(this.status!="User"){
                                            this._dataParserService.authorized=true;
                                            //this._dataParserService.username=this.status;
                                            this._sessionStorage.setUsername(this.status);
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
 private Close(){
   this._dataParserService.signIn=false;
 }
}
