import { Component } from '@angular/core';
import {DataParserService} from '../../services/dataParser.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignIn {
 private email:any;
 private pwd:any;
 public status:any;

 constructor(private _dataParserService: DataParserService) {}

 private checkSignIn(){
   this._dataParserService.SignIn(this.email,this.pwd)
                      .subscribe(data=>{
                                        this.status=data;
                                        if(this.status=="OK"){
                                            this.Close();
                                        }
                                       },
                                 error=>alert("error"),
                                 ()=>console.log('finish')
                                );
 }

 private Close(){
   this._dataParserService.signIn=false;
 }
}
