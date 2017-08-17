import { Component } from '@angular/core';
import {DataParserService} from './services/dataParser.service';
import{Header} from './header/header.component';
import {SignUp} from './header/signUp/signUp.component';
import {SignIn} from './header/signIn/signIn.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  public testData:any='';

  constructor(private _dataParserService: DataParserService) {
  }

  
  
}
