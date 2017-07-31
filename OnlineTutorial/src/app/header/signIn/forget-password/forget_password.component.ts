import { Component,OnInit} from '@angular/core';
import {DataParserService} from '../../../services/dataParser.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'forget-pwd-form',
  templateUrl: './forget_password.component.html',
  styleUrls: ['./forget_password.component.css']
})
export class ForgetPassword implements OnInit {
  public pwd:any;
  public new_pwd:any;
  public re_pwd:any;
 
  constructor(private _dataParserService: DataParserService) {}

  ngOnInit() {
   this._dataParserService.userData();
  }
  private Close(){
    this._dataParserService.ForgetPwd=false;
  }

  private changePassword(){
     this._dataParserService.changePassword();
  }
     
}
