import { Component } from '@angular/core';
import {DataParserService} from '../services/dataParser.service';
import { FormsModule }   from '@angular/forms';
import {SignUp} from './signUp/signUp.component';
import {SignIn} from './signIn/signIn.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class Header {
  
   constructor(private _dataParserService: DataParserService) {} 

   private signInFunc(){
    this._dataParserService.signIn=!this._dataParserService.signIn;
    this._dataParserService.signUp=false;
  }

  private signUpFunc(){
     this._dataParserService.signUp=!this._dataParserService.signUp;
     this._dataParserService.signIn=false;
  }
}
