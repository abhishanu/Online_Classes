import { Component,OnInit  } from '@angular/core';
import {DataParserService} from '../services/dataParser.service';
import{SessionStorageService} from '../services/sessionMaintain.service';
import { FormsModule }   from '@angular/forms';
import {SignUp} from './signUp/signUp.component';
import {SignIn} from './signIn/signIn.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class Header implements OnInit {
  
    ngOnInit() {
     var username= this._sessionStorage.getUsername();
     if(username){
        this._dataParserService.authorized=true;
        this._dataParserService.signIn=false;
        this._dataParserService.signUp=false;
     }
    }
    
   constructor(private _dataParserService: DataParserService,private _sessionStorage:SessionStorageService) {} 

   private signInFunc(){
    this._dataParserService.signIn=!this._dataParserService.signIn;
    this._dataParserService.signUp=false;
    this._dataParserService.ForgetPwd=false;
  }

  private signUpFunc(){
     this._dataParserService.signUp=!this._dataParserService.signUp;
     this._dataParserService.signIn=false;
     this._dataParserService.ForgetPwd=false;
  }
  
}
