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
    public username:any='User';
    public showUserWall:boolean=false;
    
    constructor(private _http:Http){}
    
    SignIn(email,pwd){
         let data = new URLSearchParams();
         var signInstatus:any;
         data.append('email', email);
         data.append('pwd', pwd);
         
          return this._http.post('http://localhost/OnlineTutorial/controllers/controllers.php?action=signIn',data)
           /*  .post('', data) */
            .map(res=>{signInstatus=res.json();return signInstatus;}) 
    }
    
    UserProfileData(){
        this._http.post('http://localhost/OnlineTutorial/controllers/controllers.php?action=saveStudentProfile',{});

    }
    

    SignUp(name,email,contact,pwd,confirm,type){
         let signUpstatus:any;
         let data = new URLSearchParams();
         data.append('name', name);
         data.append('email', email);
         data.append('contact', contact);
         data.append('pwd', pwd);
         data.append('confirm', confirm);
         data.append('type', type);
         return this._http
            .post('http://localhost/OnlineTutorial/controllers/controllers.php?action=signUp', data)
           .map(res=>{signUpstatus=res.json();return signUpstatus;}) 
    }  
    
    changePassword(){

    }
    
    userData(){

    }

    resetData(){
        this.signUp=false;
        this.signIn=false;
        this.authorized=false;
        this.showUserWall=false;
    }

    saveStudentInfo(name,email,contact,id){
         let data = new URLSearchParams();
         var signInstatus:any;
         data.append('nameInput', name);
         data.append('emailInput', email);
         data.append('contactInput', contact);
         data.append('id', id);
         
          return this._http.post('http://localhost/OnlineTutorial/controllers/controllers.php?action=saveStudentProfile',data)
           /*  .post('', data) */
            .map(res=>{signInstatus=res.json();return signInstatus;}) 
    }

    sendPasswordResetLink(email)
    {
        let data = new URLSearchParams();
        var status:any;
        data.append('email', email);
         
        return this._http.post('http://localhost/OnlineTutorial/controllers/controllers.php?action=forgotPassword',data).map(res=>
        {
            status=res.json();
            return status;
        });
    }

}