import { Component } from '@angular/core';

import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'signInPopUP',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignIn {
    private alert:any;
    private alert_msg:any;
    public status:any;
 
    public hideAlert(){
        
    }
}
