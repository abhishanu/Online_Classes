import { Injectable } from '@angular/core';
import {Http,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataParserService {
    public testdata;
    public signUp:boolean=false;
    public signIn:boolean=false;
    public authorized:any=false;
    public ForgetPwd:boolean=false;
    
    constructor(private _http:Http){}
    
    SignIn(email,pwd){
         let data = new URLSearchParams();
         var signInstatus:any;
         data.append('email', email);
         data.append('pwd', pwd);
         
          return this._http
            .post('http://localhost/OnlineTutorial/select.php', data)
            .map(res=>{signInstatus=res.json();return signInstatus;}) 
    }
    

    SignUp(name,email,phone,pwd){
         let signUpstatus:any;
         let data = new URLSearchParams();
         data.append('uname', name);
         data.append('email', email);
         data.append('phone', phone);
         data.append('pwd', pwd);
         return this._http
            .post('http://localhost/OnlineTutorial/insert.php', data)
           .map(res=>{signUpstatus=res.json();return signUpstatus;}) 
    }  
    
    changePassword(){

    }
    
    userData(){

    }
}