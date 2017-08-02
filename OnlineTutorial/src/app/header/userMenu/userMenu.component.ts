import { Component,OnInit} from '@angular/core';
import {DataParserService} from '../../services/dataParser.service';
import{SessionStorageService} from '../../services/sessionMaintain.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'user-menu',
  templateUrl: './userMenu.component.html',
  styleUrls: ['./userMenu.component.css']
})
export class UserMenu implements OnInit {
  public 
  constructor(private _dataParserService: DataParserService,private _sessionStorage:SessionStorageService) {}

  ngOnInit() {
   
  }
  public userMenuDetail(){
   /*  alert("Menu"); */
      /* let menu:any = document.createElement("div");
      menu.classList.add("menu"); */
      
  }
  public UserProfile(){
   // alert("Data loading....");
  }

  public signOut(){
    this._sessionStorage.signOut();
    this._dataParserService.resetData();
  }
  
     
}
